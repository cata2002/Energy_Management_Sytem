package device.repository;

import device.DTO.DeviceDTO;
import device.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findAllByUserId(Long userId);

    void deleteAllByUserId(Long userId);

    DeviceDTO save(DeviceDTO deviceDTO);
}
