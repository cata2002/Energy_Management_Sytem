import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {User} from "../../model/user/user.model";
import {EncryptionService} from "../../service/encryption.service";
import {AuthService} from "../../service/auth.service";
import {UserLogin} from "../../model/user/user-login.model";
import {switchMap, tap} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  userName = '';
  password = '';
  users: User[] = [];

  constructor(private userService: UserService, private router: Router, private encryptService: EncryptionService, private authService: AuthService) {
  }

  login(){
    let user = new UserLogin();
    user.userName = this.userName;
    user.password = this.password;
    sessionStorage.setItem('username', this.userName);
    this.authService.login(user).pipe(
      tap(token => this.userService.setToken(token)), // Set the token
      switchMap(() => this.userService.getAllUsers()) // Fetch users after setting the token
    ).subscribe({
      next: (users) => {
        this.users = users; // Update the users array
        this.checkLogin();
      },
      error: (error) => {
        console.error('Error during login or fetching users:', error);
        alert('Invalid username or password!');
      }
    });
  }

  ngOnInit(): void {
  }

  checkLogin(): void {
    let isUserExist = false;
    for (let user of this.users) {
      if (user.userName === this.userName && user.password === this.password && user.role.toLowerCase() === 'user') {
        sessionStorage.setItem('userId', this.encryptService.encrypt(user.id.toString()));
        sessionStorage.setItem('userRole', this.encryptService.encrypt(user.role.toLowerCase()));
        this.router.navigateByUrl('/user');
        isUserExist = true;
      } else if (user.userName === this.userName && user.password === this.password && user.role.toLowerCase() === 'admin') {
        sessionStorage.setItem('userId', this.encryptService.encrypt(user.id.toString()));
        sessionStorage.setItem('userRole', this.encryptService.encrypt(user.role.toLowerCase()));
        this.router.navigateByUrl('/admin');
        isUserExist = true;
      }
    }
    if (!isUserExist) {
      alert('Invalid username or password!');
    }
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        if (response) {
          this.users = response;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
