import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IDeviceState } from '../state/device.state';

const selectDevices = (state: IAppState) => state.devices;

export const selectDeviceList = createSelector(
  selectDevices,
  (state: IDeviceState) => state.devices
);

export const selectSelectedDevice = createSelector(
  selectDevices,
  (state: IDeviceState) => state.selectedDevice
);
