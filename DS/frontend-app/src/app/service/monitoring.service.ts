import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Monitoring} from "../model/monitoring/monitoring.model";

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  // baseUrl: string = 'http://localhost:8082/api/monitoring';
  baseUrl: string = 'http://monitoring.localhost:82/api/monitoring';
  constructor(private httpClient: HttpClient) { }

  getAllMonitoringById(id: number) {
    return this.httpClient.get<Monitoring[]>(this.baseUrl + '/getDeviceDataById/' + id,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }
}
