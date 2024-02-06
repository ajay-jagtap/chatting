import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {InstantChatService} from './instant-chat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatting';
  user: String = '';
  room: String = '';
  messageText: String = '';
  messageArray: Array<{user: String , message: String }> = [];
  constructor(private instantChatservice: InstantChatService){
    this.instantChatservice.newUserJoined()
      .subscribe(data => this.messageArray.push(data));


    this.instantChatservice.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this.instantChatservice.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }

  join(){
      this.instantChatservice.joinRoom({user: this.user, room: this.room});
  }

  leave(){
    this.instantChatservice.leaveRoom({user: this.user, room: this.room});
  }

  sendMessage()
  {
    this.instantChatservice.sendMessage({user: this.user, room: this.room, message: this.messageText});
  }
}
