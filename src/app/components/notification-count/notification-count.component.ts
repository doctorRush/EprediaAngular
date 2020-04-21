import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { notifications, selectSelectedDevice } from './../../store/selectors/device.selector';
import { IAppState } from './../../store/state/app.state';
import { IDeviceEvents } from './../../models/deviceEvents.interface';

@Component({
  selector: 'app-notification-count',
  templateUrl: './notification-count.component.html',
  styleUrls: ['./notification-count.component.css']
})
export class NotificationCountComponent implements OnInit {

  notificationsCount: {
    [notificationType: string]: {
      [notification: string]: number
    }
  };
  eventList: IDeviceEvents[] = [];
  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.store.select(selectSelectedDevice).subscribe(device => {
      this.store.select(notifications).subscribe(
        details => {
          this.eventList = [];
          this.notificationsCount = { "ACTIVITY_STATUS": {}, "FAULT_STATUS": {}, "WARNING_STATUS": {} };
          details.forEach(detail => {
            if (device._id === detail.deviceId) {
              if (this.notificationsCount[detail.eventKey][detail.eventParameters.description]) {
                this.notificationsCount[detail.eventKey][detail.eventParameters.description] += 1;
              } else {
                this.notificationsCount[detail.eventKey][detail.eventParameters.description] = 1;
              }
              this.eventList.push(detail)
            }
          });
        });
    });
  }
}
