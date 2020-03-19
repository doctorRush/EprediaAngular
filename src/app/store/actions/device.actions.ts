import { Action } from '@ngrx/store';

import { IDevice } from '../../models/Device.interface';

export enum EDeviceActions {
  GetDevices = '[Device] Get Devices',
  GetDevicesSuccess = '[Device] Get Devices Success',
  GetDevice = '[Device] Get Device',
  GetDeviceSuccess = '[Device] Get Device Success'
}

export class GetDevices implements Action {
  public readonly type = EDeviceActions.GetDevices;
}

export class GetDevicesSuccess implements Action {
  public readonly type = EDeviceActions.GetDevicesSuccess;
  constructor(public payload: IDevice[]) {}
}

export class GetDevice implements Action {
  public readonly type = EDeviceActions.GetDevice;
  constructor(public payload: number) {}
}

export class GetDeviceSuccess implements Action {
  public readonly type = EDeviceActions.GetDeviceSuccess;
  constructor(public payload: IDevice) {}
}

export type DeviceActions = GetDevices | GetDevicesSuccess | GetDevice | GetDeviceSuccess;
