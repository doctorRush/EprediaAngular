import { IDeviceEvents } from './../models/deviceEvents.interface';
import { getDeviceEvents, updateDeviceEvents, UpdateDeviceTelemetry, UpdateAllDeviceNotifications } from './../store/actions/device.actions';
import { IDevice } from './../models/device.interface';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { IAppState } from '../store/state/app.state';
import * as signalR from '@aspnet/signalr'
import { UpdateDevice, updateDeviceMetadata } from '../store/actions/device.actions';
import { DeviceService } from '../services/device.service';
import { MsalService } from '@azure/msal-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  userName;
  isActive = 0;
  selectDevice = null;
  devicemetadata: any;
  isConnecting = true;
  userInfo: string;
  notifList: IDeviceEvents[]= [];
  constructor(
    public translate: TranslateService,
    private deviceService: DeviceService,
    private _store: Store<IAppState>,
    private _router: Router,
    private msalService: MsalService
    ) {
    translate.setDefaultLang('en');
    translate.addLangs(['fr', 'es'])
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr|es/) ? browserLang : 'en');
    console.log(translate.getLangs());
  }

  ngOnInit() {
    this.userName = this.deviceService.userName;
    this.deviceService.ConnectHubWithSignalR().subscribe(res => {
      const options = {
        accessTokenFactory: () => res.accessToken
      };
      const connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Information)
        .withUrl(res.url, options)
        .build();

        connection.start().then(() => {
        console.log('Connected!');
        this.isConnecting = false;
      }).catch((err) => {
        return console.error(err.toString());
      });

      connection.on('deviceDetailsUpdated', (data: any) => {
        this._store.dispatch(new UpdateDevice(data[0].devicesInfo));
      });

      connection.on('deviceMetadataUpdated', (data: any) => {

        console.log('metadata update recieved via device metadata---------------------------------------------------------------------');
        this._store.dispatch(new updateDeviceMetadata(data));

      });
      connection.on('deviceEventsUpdated',(data: any) => {

        console.log(data);

        this._store.dispatch(new updateDeviceEvents(data));

        this._store.dispatch(new UpdateAllDeviceNotifications(data));
        const evList = [...this.notifList];
        evList.push(data);
        this.notifList = evList;

      });
      connection.on('deviceStatusUpdated',(data: any) => {
        // this._store.dispatch(new updateDeviceEvents(data));
        this._store.dispatch(new UpdateAllDeviceNotifications(data));

        const evList = [...this.notifList];
        evList.push(data);
        this.notifList = evList;

      });
      connection.on('deviceTelemetryUpdated', (data: any) => {

        console.log(data);
        this._store.dispatch(new UpdateDeviceTelemetry(data));

      })

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
        error_code: "2010301 => " + random,
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

  logout() {
    this.msalService.logout();
  }

}
