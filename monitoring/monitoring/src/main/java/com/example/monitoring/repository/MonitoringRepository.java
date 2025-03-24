package com.example.monitoring.repository;

import com.example.monitoring.entity.Monitoring;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonitoringRepository extends JpaRepository<Monitoring, Long> {
    List<Monitoring> findByDeviceId(Long deviceId);
}
