package device.service;

import device.DTO.DeviceDTO;
import device.builder.DeviceBuilder;
import device.entity.Device;
import device.repository.DeviceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private MessageSenderService messageSenderService;

    public List<Device> getAllDevices() {
        return this.deviceRepository.findAll();
    }

    public Device addDevice(Device device) {
        System.out.println("Adding device: " + device);

        // Save the device to the database
        Device savedDevice = deviceRepository.save(device);

        // Call sendMessage with appropriate parameters
        Long deviceId = savedDevice.getId();
        Double maxHourlyConsumption = Double.valueOf(device.getMaxHourlyConsumption());

        System.out.println("Sending message to RabbitMQ...");
        messageSenderService.sendMessage(deviceId, maxHourlyConsumption);
        return savedDevice;
    }

    public Device editDevice(Device device) throws Exception {
        Optional<Device> deviceOptional = this.deviceRepository.findById(device.getId());
        if (deviceOptional.isEmpty()) {
            throw new Exception("Device not found!");
        }
        return this.deviceRepository.save(device);
    }

    public void deleteDevice(Long id) {
        this.deviceRepository.deleteById(id);
    }

    public List<Device> getAllDevicesByUserId(Long userId) {
        return this.deviceRepository.findAllByUserId(userId);
    }

    public void deleteAllDevicesByUserId(Long userId) {
        this.deviceRepository.deleteAllByUserId(userId);
    }
}
