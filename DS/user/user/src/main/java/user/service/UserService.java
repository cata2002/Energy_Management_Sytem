package user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import user.builder.UserBuilder;
import user.dto.UserDTO;
import user.entity.User;
import user.repository.UserRepository;
import user.security.JwtUtil;

import java.util.List;
import java.util.Optional;

import static user.builder.UserBuilder.generateDTOFromEntity;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;

    public String authenticate(User userDTO) {
        User user = userRepository.findByUserName(userDTO.getUserName());
        if (user != null && (user.getPassword().equals(userDTO.getPassword()))) {
            return jwtUtil.generateToken(user.getUserName());
        }
        return null;
    }

    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    public User addUser(User user) {
        return this.userRepository.save(user);
    }


    public UserDTO getUserById(Long id) throws Exception {
        Optional<User> user = this.userRepository.findById(id);
        if (user.isEmpty()) {
            throw new Exception("User not found");
        }
        return generateDTOFromEntity(user.get());
    }

    public User updateUser(User user) throws Exception {
        Optional<User> userOptional = this.userRepository.findById(user.getId());
        if (userOptional.isEmpty()) {
            throw new Exception("User not found!");
        }
        return this.userRepository.save(user);
    }

    public void deleteUser(Long id) {
        this.userRepository.deleteById(id);
    }

    public User findByUserName(String name) {
        return this.userRepository.findByUserName(name);
    }
}
