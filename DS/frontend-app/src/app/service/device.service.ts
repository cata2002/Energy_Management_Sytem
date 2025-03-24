import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Device} from "../model/device/device.model";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  //baseUrl: string = 'http://localhost:8081/api/devices';
  baseUrl: string = 'http://device.localhost:81/api/devices';

  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }
  constructor(private httpClient: HttpClient) {
  }

  getAllDevices() {
    return this.httpClient.get<Device[]>(this.baseUrl + '/getAll',
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      });
  }

  addDevice(device: Device) {
    return this.httpClient.post<Device>(this.baseUrl + '/addDevice',
      device,
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      });
  }

  updateDevice(device: Device) {
    return this.httpClient.put<Device>(this.baseUrl + '/editDevice',
      device,
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      });
  }

  getDeviceById(id: number) {
    return this.httpClient.get<Device>(this.baseUrl + '/getById/' + id,
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      });
  }

  getAllByUserId(id: number) {
    return this.httpClient.get<Device[]>(this.baseUrl + '/getAllByUserId/' + id,
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      });
  }

  deleteDeviceById(id: number) {
    return this.httpClient.delete<Device>(this.baseUrl + '/deleteDevice/' + id,
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      });
  }

  deleteAllByUserId(id: number) {
    return this.httpClient.delete<Device>(this.baseUrl + '/deleteAllByUserId/' + id,
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      });
  }
}
