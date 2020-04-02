import { getDeviceMetaData, GetDeviceMetaDataSuccess, getDeviceEvents, GetDeviceEventsSuccess } from './../actions/device.actions';
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
import { selectDeviceList } from '../selectors/device.selector';

@Injectable()
export class DeviceEffects {
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

      return of(new GetDevicesSuccess(deviceHttp.devices))
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
      
      return action.payload}),
    switchMap((action) => this._deviceService.getDeviceMetadata(action).pipe(
      map(device => {

        console.log(device);
        return device;

      })
    )),
    switchMap((device: any) => {
      console.log(device );
     
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
      return action.payload }),
    switchMap((action) => this._deviceService.getDeviceEvents(action).pipe(
      map(device => {
        return device;
      })
    )),
    switchMap((device: any) => {
      return of(new GetDeviceEventsSuccess(device));
    })
  );

  constructor(
    private _deviceService: DeviceService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) { }
}
