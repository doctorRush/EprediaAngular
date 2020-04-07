import { Component, OnInit, NgZone } from '@angular/core';
import { SignarRService } from 'src/app/HubConfig/signar-r.service';
import { Message } from 'src/app/models/message.inteface';
// import { Chart } from 'angular-highcharts';
// import { SignarRService } from '../'


@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
    ngOnInit(): void {
    }
    //   chart: Chart;

    // title = 'ClientApp';
    // txtMessage: string = '';
    // uniqueID: string = new Date().getTime().toString();
    // messages = new Array<Message>();
    // message = new Message();
    // constructor(
    //     // private chatService: SignarRService,
    //     private _ngZone: NgZone
    // ) {
    //     this.subscribeToEvents();
    // }
    // sendMessage(): void {
    //     if (this.txtMessage) {
    //         this.message = new Message();
    //         this.message.clientuniqueid = this.uniqueID;
    //         this.message.type = "sent";
    //         this.message.message = this.txtMessage;
    //         this.message.date = new Date();
    //         this.messages.push(this.message);
    //         this.chatService.sendMessage(this.message);
    //         this.txtMessage = '';
    //     }
    // }
    // private subscribeToEvents(): void {

    //     this.chatService.messageReceived.subscribe((message: Message) => {
    //         this._ngZone.run(() => {
    //             if (message.clientuniqueid !== this.uniqueID) {
    //                 message.type = "received";
    //                 this.messages.push(message);
    //             }
    //         });
    //     });
    // }
}
