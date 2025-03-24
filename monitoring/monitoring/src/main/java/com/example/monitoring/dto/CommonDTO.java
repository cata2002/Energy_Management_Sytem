package com.example.monitoring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommonDTO {
    @JsonProperty("device_id")
    private Long deviceId;
    @JsonProperty("max_hourly_consumption")
    private String maxHourlyConsumption;
    @JsonProperty("measurement_value")
    private Double measurementValue;
    @JsonProperty("timestamp")
    private String timestamp;
}
