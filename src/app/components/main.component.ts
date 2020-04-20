import { notifications } from './../store/selectors/device.selector';
import { IDeviceEvents } from './../models/deviceEvents.interface';
import { getDeviceEvents,
   updateDeviceEvents, UpdateDeviceTelemetry, UpdateAllDeviceNotifications, GetAllDeviceNotifications } from './../store/actions/device.actions';
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
  countList: {name:string, count: any,type: number}[]; // type: 0=> Fault, type: 1 => Warning, type:2 => Activity
  isConnecting = true;
  userInfo: string;
  notifList: IDeviceEvents[] = [];
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
    this._store.dispatch(new GetAllDeviceNotifications());
    this._store.select(notifications).subscribe(res => {
      console.log(res);

      this.notifList = [];
      this.notifList = res;
      // this.notifList = [...this.notifList, ...res];
      console.log(this.notifList);
      this.calculateCount(this.notifList);
    });
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
      connection.on('deviceEventsUpdated', (data: any) => {

        console.log(data);

        this._store.dispatch(new updateDeviceEvents(data));

        this._store.dispatch(new UpdateAllDeviceNotifications(data));



      });
      connection.on('deviceStatusUpdated', (data: any) => {
        // this._store.dispatch(new updateDeviceEvents(data));
        this._store.dispatch(new UpdateAllDeviceNotifications(data));


      });
      connection.on('deviceTelemetryUpdated', (data: any) => {

        console.log(data);
        this._store.dispatch(new UpdateDeviceTelemetry(data));

      })

    });


  }
  calculateCount(notifList: IDeviceEvents[]) {
    const countList: {name:string, count: any, type: number}[] = [];

    for (const i of notifList) {

      // if(notifList.length )
      const notif = countList.filter( e => e.name == i.eventParameters.description);
      if(notif.length <= 0) {

        const count = notifList.filter( el => el.eventParameters.description == i.eventParameters.description );
        const countObj = {
          name: i.eventParameters.description,
          count: count.length,
          type: i.eventParameters.event_type == 'FAULT_STATUS'? 0 :
                 i.eventParameters.event_type == 'WARNING_STATUS' ? 1 :
                 2
        };
        countList.push(countObj);
      }
    }
    console.log(countList);

    this.countList = countList;

  }

  getNotifList(feature: number ) {

    if(this.countList.length < 1) {
      return []
    }
    return this.countList.filter(e => e.count == feature);
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
