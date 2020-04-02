import { IEventParameters } from './eventParameters';

export interface IDeviceEvents {
    
    deviceId: any,
    request: string,
    datatype: string,
    eventKey: string,
    timestamp: string,
    eventParameters:IEventParameters

  }