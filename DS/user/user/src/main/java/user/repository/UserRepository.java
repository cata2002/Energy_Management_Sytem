package user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import user.dto.UserDTO;
import user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String name);

    User findByUserNameAndPassword(String name, String password);

    User findByRole(String role);

    UserDTO save(UserDTO user);
}
