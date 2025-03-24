import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/user/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //baseUrl: string = 'http://localhost:8080/api/user';
  baseUrl: string = 'http://user.localhost/api/user';
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }
  constructor(private httpClient: HttpClient) {
  }

  getAllUsers() {
    console.log('Token', this.token);
    return this.httpClient.get<User[]>(this.baseUrl + '/getAll',
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      });
  }

  addUser(user: User) {
    return this.httpClient.post<User>(this.baseUrl + '/addUser',
      user,
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      });
  }

  getUserById(id: number) {
    return this.httpClient.get<User>(this.baseUrl + '/getById/' + id,
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      });
  }

  editUser(user: User) {
    return this.httpClient.put<User>(this.baseUrl + '/updateUser',
      user,
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      });
  }

  deleteUserById(id: number) {
    return this.httpClient.delete(this.baseUrl + '/deleteUser/' + id,
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      });
  }
}
