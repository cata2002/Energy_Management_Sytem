package user.builder;

import lombok.Builder;
import user.dto.UserDTO;
import user.entity.User;

@Builder
public class UserBuilder {

    public static UserDTO generateDTOFromEntity(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .userName(user.getUserName())
                .role(user.getRole())
                .password(user.getPassword())
                .build();
    }

    public User generateEntityFromDTO(UserDTO userDTO) {
        return User.builder()
                .id(userDTO.getId())
                .userName(userDTO.getUserName())
                .role(userDTO.getRole())
                .password(userDTO.getPassword())
                .build();
    }
}
