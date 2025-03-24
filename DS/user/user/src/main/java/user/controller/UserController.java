package user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import user.builder.UserBuilder;
import user.dto.UserDTO;
import user.entity.User;
import user.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET, value = "/getAll")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return new ResponseEntity<>(this.userService.getAllUsers().stream().map(UserBuilder::generateDTOFromEntity).collect(Collectors.toList()), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/addUser")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        return new ResponseEntity<>(this.userService.addUser(user), HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/getUserById/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable(name = "id") Long id) throws Exception {
        return new ResponseEntity<>(this.userService.getUserById(id), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User user) throws Exception {
        return new ResponseEntity<>(this.userService.updateUser(user), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        this.userService.deleteUser(id);
        return new ResponseEntity<>("User deleted!", HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        String token = userService.authenticate(user);
        if (token != null) {
            return new ResponseEntity<>(token, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }
}
