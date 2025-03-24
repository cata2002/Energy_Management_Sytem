package com.example.monitoring.repository;

import com.example.monitoring.dto.ConsumptionDTO;
import com.example.monitoring.entity.Consumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsumptionRepository extends JpaRepository<Consumption, Long> {
}
