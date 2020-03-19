import { RouterReducerState } from '@ngrx/router-store';

import { IDeviceState, initialDeviceState } from './device.state';


export interface IAppState {
  router?: RouterReducerState;
  devices: IDeviceState;
  
}

export const initialAppState: IAppState = {
  devices: initialDeviceState,
  
};

export function getInitialState(): IAppState {
  return initialAppState;
}
