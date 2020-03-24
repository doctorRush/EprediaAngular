import { IDevice } from './../../models/device.interface';
import { Action } from '@ngrx/store';


export enum EDeviceActions {
  GetDevices = '[Device] Get Devices',
  GetDevicesSuccess = '[Device] Get Devices Success',
  GetDevice = '[Device] Get Device',
  GetDeviceSuccess = '[Device] Get Device Success',
  GetDeviceMetadata = '[Device Metadata] Get device Metadata',
  GetDeviceMetadaSuccess = '[Device Metadata] Get device Metadata Success',
  GetDeviceEvents = '[ Device Events ] Get device Events',
  GetDeviceEventsSuccess = '[ Device Events ] Get device Events success',
}

export class GetDevices implements Action {
  public readonly type = EDeviceActions.GetDevices;
}

export class GetDevicesSuccess implements Action {
  public readonly type = EDeviceActions.GetDevicesSuccess;
  constructor(public payload: IDevice[]) { }
}

export class GetDevice implements Action {
  public readonly type = EDeviceActions.GetDevice;
  constructor(public payload: any) { }
}

export class GetDeviceSuccess implements Action {
  public readonly type = EDeviceActions.GetDeviceSuccess;
  constructor(public payload: IDevice) { }
}
export class getDeviceMetaData implements Action {
  public readonly type = EDeviceActions.GetDeviceMetadata;
  constructor(public payload: any) { }

}

export class GetDeviceMetaDataSuccess implements Action {
  public readonly type = EDeviceActions.GetDeviceMetadaSuccess;
  constructor(public payload: any) { }

}
export class getDeviceEvents implements Action {
  public readonly type = EDeviceActions.GetDeviceEvents;
  constructor(public payload: any) { }

}

export class GetDeviceEventsSuccess implements Action {
  public readonly type = EDeviceActions.GetDeviceEventsSuccess;
  constructor(public payload: any) { }

}
export type DeviceActions = GetDevices | GetDevicesSuccess | GetDevice | GetDeviceSuccess | getDeviceMetaData | GetDeviceMetaDataSuccess | getDeviceEvents | GetDeviceEventsSuccess;
