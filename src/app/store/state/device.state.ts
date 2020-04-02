import { IDeviceEvents } from './../../models/deviceEvents.interface';
import { IDevice } from '../../models/device.interface';

export interface IDeviceState {
  devices: IDevice[];
  selectedDevice: IDevice;
  deviceMetadata: any;
  deviceEvents:IDeviceEvents[]
}

export const initialDeviceState: IDeviceState = {
  devices: null,
  selectedDevice: null,
  deviceMetadata: null,
  deviceEvents: []
};
