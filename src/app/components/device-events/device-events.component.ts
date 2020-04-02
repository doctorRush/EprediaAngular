import { selectSelectedDevice } from './../../store/selectors/device.selector';
import { getDeviceEvents } from './../../store/actions/device.actions';
import { IDeviceEvents } from './../../models/deviceEvents.interface';
import { timer } from 'rxjs';
import { IAppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { deviceEvents } from '../../store/selectors/device.selector';


@Component({
  selector: 'app-device-events',
  templateUrl: './device-events.component.html',
  styleUrls: ['./device-events.component.css']
})
export class DeviceEventsComponent implements OnInit {
  eventList: IDeviceEvents[] = [];
  constructor(private _store: Store<IAppState>) { }

  ngOnInit() {
    timer(0, 5000).subscribe(() => {
      
      this._store.subscribe(res => {
        console.log(res);
        
      })
      this._store.select(deviceEvents).subscribe(
        event => {
          console.log(event);
          
          this.eventList = null;
          this.eventList = event;
        }
      );

      this._store.select(selectSelectedDevice).subscribe(
        device => {
          console.log(device);
  
          this._store.dispatch(new getDeviceEvents(device._id));
  
  
        }
      );
    });
  }

}
