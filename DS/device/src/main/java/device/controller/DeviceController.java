package device.controller;

import device.DTO.DeviceDTO;
import device.builder.DeviceBuilder;
import device.entity.Device;
import device.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @RequestMapping(method = RequestMethod.GET, value = "/getAll")
    public ResponseEntity<List<DeviceDTO>> getAllDevices() {
        return new ResponseEntity<>(this.deviceService.getAllDevices().stream().map(DeviceBuilder::generateDTOFromEntity).collect(Collectors.toList()), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/addDevice")
    public ResponseEntity<Device> addDevice(@RequestBody Device device) {
        return new ResponseEntity<>(this.deviceService.addDevice(device), HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/editDevice")
    public ResponseEntity<Device> editDevice(@RequestBody Device device) throws Exception {
        return new ResponseEntity<>(this.deviceService.editDevice(device), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/deleteDevice/{id}")
    public ResponseEntity<?> deleteDevice(@PathVariable Long id) {
        this.deviceService.deleteDevice(id);
        return new ResponseEntity<>("Device deleted!", HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/getAllByUserId/{userId}")
    public ResponseEntity<List<DeviceDTO>> getAllDevicesByUserId(@PathVariable Long userId) {
        return new ResponseEntity<>(this.deviceService.getAllDevicesByUserId(userId).stream().map(DeviceBuilder::generateDTOFromEntity).collect(Collectors.toList()), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/deleteAllByUserId/{userId}")
    public ResponseEntity<?> deleteAllDevicesByUserId(@PathVariable Long userId) {
        this.deviceService.deleteAllDevicesByUserId(userId);
        return new ResponseEntity<>("Devices deleted!", HttpStatus.OK);
    }
}
