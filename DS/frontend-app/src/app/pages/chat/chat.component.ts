import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChatMessage} from "../../model/chat/chat-message.model";
import {ChatService} from "../../service/chat.service";
import {EncryptionService} from "../../service/encryption.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  messages: ChatMessage[] = [];
  message: string = '';
  sender: string = '';
  receiver: string = '';
  isTyping: boolean = false;
  typingTimeout: any;
  typingMessage: string = '';
  isMessageSeen:boolean[] = [];

  //
  constructor(private chatService: ChatService, private encryptService: EncryptionService) {
  }


  ngOnInit(): void {
    this.sender = sessionStorage.getItem('username') as string;
    this.connectToChat();
  }

  sendMessage(): void {

    const messageModel = new ChatMessage();
    messageModel.content = this.message;
    messageModel.sender = sessionStorage.getItem('username') as string;
    messageModel.receiver = this.receiver;
    console.log(messageModel);

    const userRole = this.encryptService.decrypt(sessionStorage.getItem('userRole') as string);

    if (userRole === 'admin') {
      // If admin, send to public channel
      this.chatService.sendMessage('/app/send/public', messageModel);
    }else {
      this.chatService.sendMessage('/app/send/' + this.receiver, messageModel);
    }

    this.messages.push(messageModel);

  }

  connectToChat() {
    this.chatService.connectToChat(() => {
      this.chatService
        .subscribeToChat(this.sender)
        .subscribe((message) => {
          this.messages.push(message);
        });
      this.chatService.subscribeToTypingNotifications(`/topic/typing/`).subscribe((notification) => {{
          this.typingMessage = `typing...`;
          this.isTyping = true;
          clearTimeout(this.typingTimeout);
          this.typingTimeout = setTimeout(() => {
            this.isTyping = false;
            this.typingMessage = '';
          }, 3000);
        }
      });
      this.chatService.subscribeToSeenNotifications().subscribe((notification) => {
        console.log(notification);
        const [sender, receiver, messageIndex] = notification.split(':');

        if (
          (sender === this.receiver && receiver === this.sender) ||
          (sender === this.sender && receiver === this.receiver)
        ) {
          const index = parseInt(messageIndex, 10);
          if (!isNaN(index) && index >= 0 && index < this.messages.length) {
            this.isMessageSeen[index] = true;
          }
        }
      });
    });

  }

  onMessageClick(messageSender: string, index: number): void {
    const notification = `${messageSender}:${this.sender}:${index}`;
    this.chatService.notifyMessageSeen(notification);
  }


  onTyping(): void {
      this.chatService.notifyTyping(`/topic/typing/`, this.sender);
  }
}
