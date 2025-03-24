package device.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "address")
    private String address;

    @Column(name = "max_hourly_consumption")
    private String maxHourlyConsumption;

    @Column(name = "user_id")
    private Long userId;

}
