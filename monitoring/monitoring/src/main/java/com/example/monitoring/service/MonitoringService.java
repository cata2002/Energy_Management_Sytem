package com.example.monitoring.service;

import com.example.monitoring.entity.Consumption;
import com.example.monitoring.entity.Monitoring;
import com.example.monitoring.repository.ConsumptionRepository;
import com.example.monitoring.repository.MonitoringRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MonitoringService {

    @Autowired
    private MonitoringRepository monitoringRepository;

    @Autowired
    private ConsumptionRepository consumptionRepository;

    public List<Monitoring> getMonitoringData(Long deviceId) {
        return monitoringRepository.findByDeviceId(deviceId);
    }

    public List<Consumption> getConsumptionData() {
        return consumptionRepository.findAll();
    }
}
