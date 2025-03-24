import { Injectable } from '@angular/core';
import {WebSocketSubject, WebSocketSubjectConfig} from "rxjs/internal/observable/dom/WebSocketSubject";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket!: WebSocketSubject<any>;

  constructor() {
    const config:WebSocketSubjectConfig<any> = {
      url: 'ws://localhost:8082/ws',
      deserializer: (e: any) => {
        (e.data)
      }
    };
    this.socket = new WebSocketSubject(config);
  }

  sendMessage(message: any) {
    this.socket.next(message);
  }

  getMessage() {
    return this.socket.asObservable();
  }

  closeConnection() {
    this.socket.complete();
  }
}
