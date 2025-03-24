package device.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceDTO {
    private Long id;
    private String description;
    private String address;
    private String maxHourlyConsumption;
    private Long userId;
}
