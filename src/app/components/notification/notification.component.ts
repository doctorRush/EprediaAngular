import { deviceEvents } from './../../store/selectors/device.selector';
import { IDeviceEvents } from './../../models/deviceEvents.interface';
import { IAppState } from './../../store/state/app.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  eventList: IDeviceEvents[] = [];
  activeTab = 0;
  viewMode= 'fault';
  constructor(private store: Store<IAppState>) { }

  ngOnInit() {

    this.store.select(deviceEvents).subscribe(
      res => {
        this.eventList = res;
      }
    );


  }

}
