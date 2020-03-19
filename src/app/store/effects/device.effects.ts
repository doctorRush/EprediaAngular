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
  // Function to 
  @Effect()
  getDevice$ = this._actions$.pipe(
    ofType<GetDevice>(EDeviceActions.GetDevice),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectDeviceList))),
    switchMap(([id, devices]) => {
      const selectedDevice = devices.filter(device => device.Id === +id)[0];
      return of(new GetDeviceSuccess(selectedDevice));
    })
  );

  @Effect()
  getDevices$ = this._actions$.pipe(
    ofType<GetDevices>(EDeviceActions.GetDevices),
    switchMap(() => this._deviceService.getDevices().pipe(
      map(device => {
       // console.log(device);
        return device;

      })
    )),
    switchMap((deviceHttp: IDeviceHttp) => {
     console.log(JSON.parse(JSON.stringify(deviceHttp)).deviceInfo.devices);

    //  return of(new GetDevicesSuccess(deviceHttp.devices))})
      return of(new GetDevicesSuccess(JSON.parse(JSON.stringify(deviceHttp)).deviceInfo.devices))})
  );

  constructor(
    private _deviceService: DeviceService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}
}
