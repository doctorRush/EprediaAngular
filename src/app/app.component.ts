import { Component, OnInit} from '@angular/core';

import * as signalR from '@aspnet/signalr';
import { MsalService } from '@azure/msal-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EprediaRevos';
  type: string;
  payload: string;
  constructor(msalService: MsalService) {
    msalService.handleRedirectCallback(_ => { });
  }

  ngOnInit(){
    return;
    console.log('connecting to server');
    
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("https://epredia-azure-functions-20200326120440728.azurewebsites.net/api")
      .build();
      console.log('Starting server');


    connection.start().then(function () {
      console.log('Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("BroadcastMessage", (data: any) => {
      // this.messageService.add({ severity: type, summary: payload, detail: 'Via SignalR' });
      // console.log(type, payload);
      // this.type = type;
      // this.payload = payload;
console.log(data)
    });
  }
}
