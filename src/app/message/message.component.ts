import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message = "";
  constructor(public MessageService: MessageService) { }

  ngOnInit() {
    this.MessageService.message$.subscribe(message =>{ 
      this.message = message;
      setTimeout(() => (this.message =''), 5000);
  });
}

}
