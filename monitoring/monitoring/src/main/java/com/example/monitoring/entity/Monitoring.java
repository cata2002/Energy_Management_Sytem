package com.example.monitoring.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Monitoring {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "measurement_value")
    private Long measurementValue;

    @Column(name = "timestamp")
    private String timestamp;

    @Column(name = "device_id")
    private Long deviceId;
}
