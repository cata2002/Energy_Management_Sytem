package device.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Component
public class MessageSenderService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @Value("${spring.rabbitmq.queue}")
    private String queueName;

    public void sendMessage(Long deviceId, Double maxHourlyConsumption) {
        try {
            Map<String, Object> message = new HashMap<>();
            message.put("device_id", deviceId);
            message.put("max_hourly_consumption", maxHourlyConsumption);
            String jsonMessage = objectMapper.writeValueAsString(message);
            System.out.println("Sending message: " + jsonMessage);
            rabbitTemplate.convertAndSend(queueName, jsonMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
