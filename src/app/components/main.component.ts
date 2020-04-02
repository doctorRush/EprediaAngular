import { IDeviceEvents } from './../models/deviceEvents.interface';
import { getDeviceEvents, updateDeviceEvents } from './../store/actions/device.actions';
import { IDevice } from './../models/device.interface';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { IAppState } from '../store/state/app.state';
import * as signalR from '@aspnet/signalr'
import { UpdateDevice, updateDeviceMetadata } from '../store/actions/device.actions';

import { DeviceService } from '../services/device.service';
import { timer } from 'rxjs';
import { IDeviceMetadata } from '../models/deviceMetadata.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isActive = 0;
  selectDevice = null;
  devicemetadata: any;
  isConnecting = true;

  constructor(
    private deviceService: DeviceService,
    private _store: Store<IAppState>, private _router: Router) { }

  ngOnInit() {

    // timer(0,5000).subscribe(
    //   () => {
    //     console.log('updating metadata');

    //     this.dummyFunction();
    //   }
    // );

    console.log('connecting to server');

    this.deviceService.ConnectHubWithSignalR().subscribe(res => {

      console.log(res);

      const options = {
        accessTokenFactory: () => res.accessToken
      };
      const connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Information)
        .withUrl(res.url, options)
        .build();
      console.log('Starting server');


      connection.start().then(() => {
        console.log('Connected!');
        this.isConnecting=false;
      }).catch((err) => {
        return console.error(err.toString());
      });

      connection.on('deviceDetails', (data: any) => {

        console.log(' update recieved via device update---------------------------------------------------------------------');
        console.log(data);
        this._store.dispatch(new UpdateDevice(data[0].devicesInfo));
      });

      connection.on('deviceMetadata', (data: any) => {
        console.log(data);
        if (data[0].request ? data[0].request == 'senddata' : false) {
          console.log('update event recieved');
          this._store.dispatch(new updateDeviceEvents(data));
        } else {
          console.log('metadata update recieved via device metadata---------------------------------------------------------------------');
          this._store.dispatch(new updateDeviceMetadata(data));
        }

      });

    });


  }
  dummyFunction() {
    console.log('calling update  metadata  with dummy data');
    const random = Math.random();
    const payload: IDeviceEvents = {
      datatype: "event",
      deviceId: "revos-us-device7770",
      eventKey: "no" + random,
      eventParameters: {
        commercial_region: "33",
        description: "Warn Chamber Temprature Over",
        error_code: "2010301 => "+ random,
        event_type: "WARNING_STATUS",
        service_region: "66"
      },
      request: "senddata",
      timestamp: "2020-04-01T20:23:00.277Z"
    }
    const data: IDeviceEvents[] = [];
    data.push(payload);
    this._store.dispatch(new updateDeviceEvents(data));

  }

  selectedDevice(device: IDevice) {


  }

}
