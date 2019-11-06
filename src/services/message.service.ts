import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public message$ = new Subject<string>();
  constructor() { }


  sendMessage(message: string){
    this.message$.next(message);
  }
}


