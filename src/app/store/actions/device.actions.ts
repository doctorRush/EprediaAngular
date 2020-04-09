import { IDeviceEvents } from './../../models/deviceEvents.interface';
import { IDeviceMetadata } from './../../models/deviceMetadata.interface';
import { IDevice } from './../../models/device.interface';
import { Action } from '@ngrx/store';
import { TelemtryPayload, DeviceTelemetry } from 'src/app/models/device-telemetry';


export enum EDeviceActions {
  GetDevices = '[Device] Get Devices',
  GetDevicesSuccess = '[Device] Get Devices Success',
  GetDevice = '[Device] Get Device',
  UpdateDevice = '[Device] update Device',
  UpdateSelectedDevice = '[Device] Update selected device',
  GetDeviceSuccess = '[Device] Get Device Success',
  GetDeviceMetadata = '[Device Metadata] Get device Metadata',
  GetDeviceMetadaSuccess = '[Device Metadata] Get device Metadata Success',
  GetDeviceEvents = '[ Device Events ] Get device Events',
  GetDeviceEventsSuccess = '[ Device Events ] Get device Events success',
  GetDeviceTelemetry = '[Device Telemetry] Get device telemetry for last hour',
  GetDeviceTelemetrySuccess = '[Device Telemetry] Get device telemetry for last hour success',
  UpdateDeviceTelemetry = '[Device telemetry update] update device telemetry',
  UpdateDeviceTelemetrySuccess = '[Device telemetry update success] update device telemetry',
  UpdateDeviceTelemetryFail = '[Device Telemetry Fail] update device telemetry fail',
  GetDeviceTelemetrByDuration = '[Device Telemetry] Get device telemetry by Duration',
  GetDeviceTelemetrByDurationSuccess = '[Device Telemetry] Get device telemetry by Duration success',

  updateDeviceMetadata = '[Device Metadata] update device metadata',
  updateDeviceMetadataSuccess = '[Device Metadata success] update device metadata Success',
  updateDeviceMetadataFail = '[Device Metadata Fail] update device metadata Fail',
  updateDeviceEvents = '[ Device Events ] update device events',
  updateDeviceEventsSuccess = '[ Device Events Success] update device events success',
  updateDeviceEventsFail = '[ Device Events Fail] update device events Fail'

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

export class UpdateDevice implements Action {
  public readonly type = EDeviceActions.UpdateDevice;
  constructor(public payload: any[]) { }
}

export class updateSelectedDevice implements Action {
  public readonly type = EDeviceActions.UpdateSelectedDevice;
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


export class GetDeviceTelemetry implements Action {
  public readonly type = EDeviceActions.GetDeviceTelemetry;
  constructor(public payload: any) { }
}


export class updateDeviceMetadata implements Action {
  public readonly type = EDeviceActions.updateDeviceMetadata;
  constructor(public payload: IDeviceMetadata[]) { }

}

export class updateDeviceMetadataFail implements Action {
  public readonly type = EDeviceActions.updateDeviceMetadataFail;

}

export class updateDeviceMetadataSuccess implements Action {
  public readonly type = EDeviceActions.updateDeviceMetadataSuccess;
  constructor(public payload: IDeviceMetadata[]) { }

}


export class updateDeviceEvents implements Action {
  public readonly type = EDeviceActions.updateDeviceEvents;
  constructor(public payload: IDeviceEvents[]) { }

}
export class updateDeviceEventsSuccess implements Action {
  public readonly type = EDeviceActions.updateDeviceEventsSuccess;
  constructor(public payload: IDeviceEvents[]) { }

}
export class updateDeviceEventsFail implements Action {
  public readonly type = EDeviceActions.updateDeviceEventsFail;

}
export class GetDeviceTelemetrySuccess implements Action {
  public readonly type = EDeviceActions.GetDeviceTelemetrySuccess;
  constructor(public payload: DeviceTelemetry[]) { }

}

export class GetDeviceTelemetryByTime implements Action {
  public readonly type = EDeviceActions.GetDeviceTelemetrByDuration;
  constructor(public payload: TelemtryPayload) { }

}

export class GetDeviceTelemetryByTimeSuccess implements Action {
  public readonly type = EDeviceActions.GetDeviceTelemetrByDurationSuccess;
  constructor(public payload: DeviceTelemetry[]) { }

}
export class UpdateDeviceTelemetry implements Action {
  public readonly type = EDeviceActions.UpdateDeviceTelemetry;
  constructor(public payload: DeviceTelemetry[]) { }
}
export class UpdateDeviceTelemetrySuccess implements Action {
  public readonly type = EDeviceActions.UpdateDeviceTelemetrySuccess;
  constructor(public payload: DeviceTelemetry[]) { }
}
export class UpdateDeviceTelemetryFail implements Action {
  public readonly type = EDeviceActions.UpdateDeviceTelemetryFail;

}
export type DeviceActions = GetDevices | GetDevicesSuccess | GetDevice
  | GetDeviceSuccess | getDeviceMetaData
  | GetDeviceMetaDataSuccess
  | getDeviceEvents
  | GetDeviceEventsSuccess
  | GetDeviceTelemetry
  | GetDeviceTelemetrySuccess
  | GetDeviceTelemetryByTime
  | GetDeviceTelemetryByTimeSuccess
  | UpdateDevice
  | updateSelectedDevice
  | updateDeviceMetadata
  | updateDeviceEvents
  | updateDeviceMetadataSuccess
  | updateDeviceMetadataFail
  | updateDeviceEventsSuccess
  | updateDeviceEventsFail
  | UpdateDeviceTelemetry
  | UpdateDeviceTelemetryFail
  |UpdateDeviceTelemetrySuccess;
