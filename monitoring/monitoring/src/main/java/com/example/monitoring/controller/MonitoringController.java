package com.example.monitoring.controller;

import com.example.monitoring.entity.Consumption;
import com.example.monitoring.entity.Monitoring;
import com.example.monitoring.service.MonitoringConfig;
import com.example.monitoring.service.MonitoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/monitoring")
@CrossOrigin
public class MonitoringController {

    @Autowired
    private MonitoringConfig rabbitMQListener;

    @Autowired
    private MonitoringService monitoringService;

    @GetMapping("/getDeviceData")
    public String getMonitoringData() {
        return rabbitMQListener.getLatestMessage();
    }

    @GetMapping("/getDeviceDataById/{id}")
    public List<Monitoring> getMonitoringDataById(@PathVariable Long id) {
        return monitoringService.getMonitoringData(id);
    }

    @GetMapping("/getConsumptionData")
    public List<Consumption> getConsumptionData() {
        return monitoringService.getConsumptionData();
    }
}
