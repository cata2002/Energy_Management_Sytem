import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import SockJS from 'sockjs-client';
import {Stomp} from "@stomp/stompjs";
import {ChatMessage} from "../model/chat/chat-message.model";
import {EncryptionService} from "./encryption.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient!: any;

  constructor(private encryptService: EncryptionService) { }
  connectToChat(callback: () => void): void {
    const socket = new SockJS('http://localhost:8086/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);
      callback();
    }, (error: any) => {
      console.log('STOMP connection error:', error);
    });
  }

  subscribeToUser(userId: number): void {
    let channel = '/topic/user/' + userId;

    if (this.stompClient.connected) {
      this.stompClient.subscribe(channel, (message: { body: any; }) => {

      });
    }
  }

  subscribeToChat(username:string): Observable<ChatMessage> {
    const subject = new Subject<ChatMessage>();

    if (this.encryptService.decrypt(sessionStorage.getItem('userRole') as string) !== 'admin') {
      this.stompClient.subscribe(`/topic/${username}`, (message: { body: string }) => {
        const parsedMessage = JSON.parse(message.body) as ChatMessage;
        console.log(parsedMessage);
        subject.next(parsedMessage);
      });
    }

    // if (this.encryptService.decrypt(sessionStorage.getItem('userRole') as string) === 'admin') {
    //     this.stompClient.subscribe('/topic/public', (message: { body: string }) => {
    //       const parsedMessage = JSON.parse(message.body) as ChatMessage;
    //       console.log(parsedMessage);
    //       subject.next(parsedMessage);
    //     });
    //   }

    this.stompClient.subscribe('/topic/public', (message: { body: string }) => {
      const parsedMessage = JSON.parse(message.body) as ChatMessage;
      console.log('Public message:', parsedMessage);
      subject.next(parsedMessage);
    });

    return subject.asObservable();
  }

  subscribeToTypingNotifications(channelName: string): Observable<any> {
    const subject = new Subject<any>();

    this.stompClient.subscribe(channelName, (message: { body: string }) => {
      const parsedMessage = JSON.parse(message.body);
      subject.next(parsedMessage);
    });

    return subject.asObservable();
  }

  subscribeToSeenNotifications(): Observable<string> {
    const subject = new Subject<string>();

    this.stompClient.subscribe('/topic/seen', (message: { body: string }) => {
      const parsedMessage = JSON.parse(message.body);
      subject.next(parsedMessage);
    });

    return subject.asObservable();
  }

  notifyTyping(channelName: string, username: string): void {
    if (this.stompClient.connected) {
      this.stompClient.publish({ destination: channelName, body: JSON.stringify("Typing")});
    }
  }

  sendMessage(channelName: string, messageModel: any): void {
    console.log(this.stompClient.connected);
    if (this.stompClient.connected) {
      this.stompClient.publish({destination: channelName, body: JSON.stringify(messageModel)});
    }
  }

  notifyMessageSeen(message: string): void {
    if (this.stompClient.connected) {
      // const notification = `${sender}:${receiver}`;
      this.stompClient.publish({
        destination: '/app/seen',
        body: JSON.stringify(message),
      });
    }
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
      });
    }
  }
}
