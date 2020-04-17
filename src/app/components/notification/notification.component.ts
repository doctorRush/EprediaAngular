import { deviceEvents, notifications, selectSelectedDevice } from './../../store/selectors/device.selector';
import { IDeviceEvents } from './../../models/deviceEvents.interface';
import { IAppState } from './../../store/state/app.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { stringify } from 'querystring';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  eventList: IDeviceEvents[] = [];
  activeTab = 0;
  viewMode = 'fault';
  countList: {name:string, count: any}[];
  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.store.select(selectSelectedDevice).subscribe(device => {

      this.store.select(notifications).subscribe(
        res => {
          this.eventList = []

          const notif = [];
          for (const i of res) {
            if (i.deviceId == device._id) {
              notif.push(i);
            }
          }
          this.eventList = notif;
          this.calculateCount(res);
        });
    }
    );


  }
  calculateCount(notifList: IDeviceEvents[]) {
    const countList: {name:string, count: any}[] = [];

    for (const i of notifList) {

      // if(notifList.length )
      const notif = countList.filter( e => e.name == i.eventParameters.description);
      if(notif.length <= 0) {

        const count = notifList.filter( el => el.eventParameters.description == i.eventParameters.description );
        const countObj = {
          name: i.eventParameters.description,
          count: count.length
        };
        countList.push(countObj);
      }
    }
    this.countList = countList;
  }

}
