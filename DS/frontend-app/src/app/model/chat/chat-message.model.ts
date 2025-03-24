export class ChatMessage {
  sender!: string;
  content!: string;
  receiver!: string;
  seen: boolean = false;
}
