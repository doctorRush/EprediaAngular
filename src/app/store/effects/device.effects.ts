import {
  getDeviceMetaData, GetDeviceMetaDataSuccess,
  getDeviceEvents, GetDeviceEventsSuccess, GetDeviceTelemetry,
  GetDeviceTelemetrySuccess,
  GetDeviceTelemetryByTime,
  UpdateDevice,
  updateDeviceMetadata,
  updateDeviceMetadataSuccess,
  updateDeviceMetadataFail,
  updateDeviceEvents,
  updateDeviceEventsSuccess,
  updateDeviceEventsFail
} from './../actions/device.actions';
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';
import {
  GetDevicesSuccess,
  EDeviceActions,
  GetDeviceSuccess,
  GetDevice,
  GetDevices
} from '../actions/device.actions';
import { DeviceService } from '../../services/device.service';
import { IDeviceHttp } from '../../models/http-models/device-http.interface';
import { selectDeviceList, selectSelectedDevice } from '../selectors/device.selector';
import { DeviceTelemetry } from '../../models/device-telemetry';

@Injectable()
export class DeviceEffects {


  constructor(
    private _deviceService: DeviceService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) { }

  @Effect()
  getDevice$ = this._actions$.pipe(
    ofType<GetDevice>(EDeviceActions.GetDevice),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectDeviceList))),
    switchMap(([id, devices]) => {
      const selectedDevice = devices.filter(device => device._id == id)[0];
      return of(new GetDeviceSuccess(selectedDevice));
    })
  );


  // update device metadata for selected device
  @Effect()
  updateDeviceMetadata$ = this._actions$.pipe(
    ofType<updateDeviceMetadata>(EDeviceActions.updateDeviceMetadata),
    map(action => {
      console.log('action object => ')

      console.log(action);

      return action.payload
    }),
    withLatestFrom(this._store.pipe(select(selectSelectedDevice))),
    switchMap(([payload, device]) => {

      console.log('inside effect iteray\ting pay,load');
      console.log(payload);


      for (const i of payload) {
        console.log('inside payload array');

        // console.log(i)
        // return of(new updateDeviceMetadataSuccess(payload)); // replace inside prod
        if (device._id == i.deviceId) {
          const a = []
          a.push(i)
          return of(new updateDeviceMetadataSuccess(a));
        }
        else {
        }

      }
      return of(new updateDeviceMetadataFail());
    })
  );


  @Effect()
  updateSelectedDevice$ = this._actions$.pipe(
    ofType<UpdateDevice>(EDeviceActions.UpdateDevice),
    withLatestFrom(this._store.pipe(select(selectSelectedDevice))),
    switchMap(([updateList, selectedDevice]) => {
      console.log('inside update device effect');
      console.log(updateList, selectedDevice);
      return of(new GetDevice(selectedDevice._id));
    })
  );



  @Effect()
  updateSEvent$ = this._actions$.pipe(
    ofType<updateDeviceEvents>(EDeviceActions.updateDeviceEvents),
    map(action => {
      console.log(action);
      return action.payload;
    }),
    withLatestFrom(this._store.pipe(select(selectSelectedDevice))),
    switchMap(([events, selectedDevice]) => {
      for (const i of events) {

        if (selectedDevice._id == i.deviceId) {
          const a = [];
          a.push(i);
          return of(new updateDeviceEventsSuccess(a));
        }
      }
      return of(new updateDeviceEventsFail());
    })
  );


  @Effect()
  getDevices$ = this._actions$.pipe(
    ofType<GetDevices>(EDeviceActions.GetDevices),
    switchMap(() => this._deviceService.getDevices().pipe(
      map(device => {
        console.log(device);
        return device;

      })
    )),
    switchMap((deviceHttp: IDeviceHttp) => {
      console.log(deviceHttp);

      return of(new GetDevicesSuccess(deviceHttp.devices));
    })
  );

  /**
   * @description: get Device metadata
   */
  @Effect()
  getDeviceMetadata$ = this._actions$.pipe(
    ofType<getDeviceMetaData>(EDeviceActions.GetDeviceMetadata),
    map(action => {
      console.log(action);

      return action.payload
    }),
    switchMap((action) => this._deviceService.getDeviceMetadata(action).pipe(
      map(device => {

        console.log(device);
        return device;

      })
    )),
    switchMap((device: any) => {
      console.log(device);

      return of(new GetDeviceMetaDataSuccess(device.deviceMetdata.events))
    })
  );


  /**
 * @description: get Device Events
 */
  @Effect()
  getDeviceEvents$ = this._actions$.pipe(
    ofType<getDeviceEvents>(EDeviceActions.GetDeviceEvents),
    map(action => {
      console.log(action);
      return action.payload
    }),
    switchMap((action) => this._deviceService.getDeviceEvents(action).pipe(
      map(device => {
        return device;
      })
    )),
    switchMap((device: any) => {
      return of(new GetDeviceEventsSuccess(device));
    })
  );


  /**
 * @description: get Device Telemetry
 */
  @Effect()
  getDeviceTelemetry$ = this._actions$.pipe(
    ofType<GetDeviceTelemetry>(EDeviceActions.GetDeviceTelemetry),
    map(action => {
      return action.payload;
    }),
    switchMap((action) => this._deviceService.getLastHourTelemetryData(action).pipe(
      map(device => {
        return device;
      })
    )),
    switchMap((device: DeviceTelemetry[]) => of(new GetDeviceTelemetrySuccess(device)))
  );


  /**
 * @description: get Device Telemetry
 */
  @Effect()
  getDeviceTelemetryByTime$ = this._actions$.pipe(
    ofType<GetDeviceTelemetryByTime>(EDeviceActions.GetDeviceTelemetrByDuration),
    map((action: any) => {
      return action.payload;
    }),
    switchMap((action) => this._deviceService.getTimeSpecificTelemetryData(action.deviceId, action.time).pipe(
      map(device => {
        return device;
      })
    )),
    switchMap((device: DeviceTelemetry[]) => of(new GetDeviceTelemetrySuccess(device)))
  );
}
