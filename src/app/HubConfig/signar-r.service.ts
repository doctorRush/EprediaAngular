import { EventEmitter, Injectable } from '@angular/core';  
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';  
import { Message } from '../models/message.inteface';  
import { environment } from 'src/environments/environment';
import * as signalR from '@aspnet/signalr';
  
@Injectable({
  providedIn: 'root'
})  
export class SignarRService {  y
  messageReceived = new EventEmitter<Message>();  
  connectionEstablished = new EventEmitter<Boolean>();  
  
  public connectionIsEstablished = false;  
  public _hubConnection: HubConnection;  
  
  // constructor() {  
  //   this.createConnection();  
  //   this.registerOnServerEvents();  
  //   this.startConnection();  
  // }  
  
  // sendMessage(message: Message) {  
  //   this._hubConnection.invoke('NewMessage', message);  
  // }  
  
  // public createConnection() {  
  //   this._hubConnection = new HubConnectionBuilder()  
  //     .withUrl(environment.hubUrl + )  
  //     .build();  
  // }  
  
  // public startConnection(): void {  
  //   this._hubConnection  
  //     .start()  
  //     .then(() => {  
  //       this.connectionIsEstablished = true;  
  //       console.log('Hub connection started');  
  //       this.connectionEstablished.emit(true);  
  //     })  
  //     .catch(err => {  
  //       console.log('Error while establishing connection, retrying...');  
  //       setTimeout(function () { this.startConnection(); }, 5000);  
  //     });  
  // }  
  
  // public registerOnServerEvents(): void {  
  //   this._hubConnection.on('ReceiveMessage', (data: any) => {  
  //     this.messageReceived.emit(data);  
  //   });  
  // }  
}   