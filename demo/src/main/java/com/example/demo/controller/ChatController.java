package com.example.demo.controller;

import com.example.demo.model.ChatMessage;
import com.example.demo.model.TypingNotification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/send/{recipient}")
    public void sendMessage(@DestinationVariable String recipient,@Payload ChatMessage chatMessage) {
        messagingTemplate.convertAndSend("/topic/" + recipient, chatMessage);

//        messagingTemplate.convertAndSend("/topic/public", chatMessage);
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(ChatMessage chatMessage) {
        chatMessage.setContent("User " + chatMessage.getSender() + " joined");
        return chatMessage;
    }

    @MessageMapping("/typing")
    public void sendTypingNotification(@Payload TypingNotification typingNotification) {
        messagingTemplate.convertAndSend("/topic/typing", typingNotification);
    }

    @MessageMapping("/seen")
    public void notifyMessageSeen(@Payload String notification) {
        String[] parts = notification.split(":");
        String sender = parts[0];
        String receiver = parts[1];
        String messageIndex = parts[2];

        String recipientTopic = "/topic/" + receiver + "/seen";
        String senderTopic = "/topic/" + sender + "/seen";
        messagingTemplate.convertAndSend("/topic/seen", notification);
//        messagingTemplate.convertAndSend(senderTopic, notification);
    }

    @MessageMapping("/send/public")
    @SendTo("/topic/public")
    public ChatMessage sendPublicMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }
}
