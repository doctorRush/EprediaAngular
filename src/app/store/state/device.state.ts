import { IDevice } from '../../models/device.interface';

export interface IDeviceState {
  devices: IDevice[];
  selectedDevice: IDevice;
}

export const initialDeviceState: IDeviceState = {
  devices: null,
  selectedDevice: null
};