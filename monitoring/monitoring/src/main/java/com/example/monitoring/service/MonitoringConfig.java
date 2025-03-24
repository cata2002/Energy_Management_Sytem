package com.example.monitoring.service;

import com.example.monitoring.config.RabbitMQConfig;
import com.example.monitoring.config.WebSocketHandler;
import com.example.monitoring.dto.CommonDTO;
import com.example.monitoring.dto.ConsumptionDTO;
import com.example.monitoring.dto.MonitoringDTO;
import com.example.monitoring.entity.Consumption;
import com.example.monitoring.entity.Monitoring;
import com.example.monitoring.repository.ConsumptionRepository;
import com.example.monitoring.repository.MonitoringRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Getter
@Service
@EnableRabbit
public class MonitoringConfig {

    @Autowired
    private MonitoringRepository monitoringRepository;

    @Autowired
    private ConsumptionRepository consumptionRepository;

    private String latestMessage;

    @Autowired
    private RabbitMQConfig rabbitMQConfig;

    @Autowired
    private WebSocketHandler webSocketHandler;

    private MonitoringDTO monitoringDTO;

    private ConsumptionDTO consumptionDTO;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @RabbitListener(queues = "#{rabbitMQConfig.getName()}")
    public void receiveMessage(String message) {
            try {
                CommonDTO commonDTO = objectMapper.readValue(message, CommonDTO.class);

                if(commonDTO.getTimestamp()!=null) {
                    monitoringDTO = objectMapper.readValue(message, MonitoringDTO.class);
                    Monitoring monitoring = Monitoring.builder()
                            .measurementValue(monitoringDTO.getMeasurementValue().longValue())
                            .deviceId((monitoringDTO.getDeviceId()))
                            .timestamp(monitoringDTO.getTimestamp())
                            .build();
                    monitoringRepository.save(monitoring);
                    List<Consumption> consumptionList = consumptionRepository.findAll();
                    for(Consumption monitor: consumptionList){
                        if(Objects.equals(monitoring.getDeviceId(), monitor.getDeviceId()) && monitoring.getMeasurementValue()>Double.parseDouble(monitor.getMaxHourlyConsumption())){
                            webSocketHandler.sendMessageToAll("Device has exceeded the maximum hourly consumption limit.");
                            System.out.println("received monitoring message");
                        }
                    }
                }
                else{
                    consumptionDTO = objectMapper.readValue(message, ConsumptionDTO.class);
                            Consumption consumption = Consumption.builder()
                            .deviceId(commonDTO.getDeviceId())
                            .maxHourlyConsumption(commonDTO.getMaxHourlyConsumption().toString())
                            .build();
                    consumptionRepository.save(consumption);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        this.latestMessage = message;
        System.out.println("Received message: " + message);
    }

}
