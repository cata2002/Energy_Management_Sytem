package com.example.monitoring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MonitoringDTO {
    @JsonProperty("measurement_value")
    private Double measurementValue;
    @JsonProperty("device_id")
    private Long deviceId;
    @JsonProperty("timestamp")
    private String timestamp;
}
