package device.builder;

import device.DTO.DeviceDTO;
import device.entity.Device;
import lombok.Builder;

@Builder
public class DeviceBuilder {
    public static DeviceDTO generateDTOFromEntity(Device device) {
        return DeviceDTO.builder()
                .id(device.getId())
                .address(device.getAddress())
                .description(device.getDescription())
                .maxHourlyConsumption(device.getMaxHourlyConsumption())
                .userId(device.getUserId())
                .build();
    }

    public Device generateEntityFromDTO(DeviceDTO deviceDTO) {
        return Device.builder()
                .id(deviceDTO.getId())
                .address(deviceDTO.getAddress())
                .description(deviceDTO.getDescription())
                .maxHourlyConsumption(deviceDTO.getMaxHourlyConsumption())
                .userId(deviceDTO.getUserId())
                .build();
    }
}
