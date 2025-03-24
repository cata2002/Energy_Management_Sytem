import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user/user.model";
import {UserLogin} from "../model/user/user-login.model";
import {tap} from "rxjs";
import {DeviceService} from "./device.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //baseUrl: string = 'http://localhost:8080/api/user';
  baseUrl: string = 'http://user.localhost/api/user';

  constructor(private httpClient: HttpClient, private userService: UserService, private deviceService: DeviceService) {}

  login(user: UserLogin) {
    return this.httpClient.post(this.baseUrl + '/login', {
      userName: user.userName,
      password: user.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text'
    }).pipe(
      tap((response: string) => {
        this.userService.setToken(response);
        this.deviceService.setToken(response);
      })
    );
  }
}
