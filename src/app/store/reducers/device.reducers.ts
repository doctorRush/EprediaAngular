import { EDeviceActions } from './../actions/device.actions';
import { DeviceActions } from '../actions/device.actions';
import { initialDeviceState, IDeviceState } from '../state/device.state';

export const deviceReducers = (
  state = initialDeviceState,
  action: DeviceActions
): IDeviceState => {
  switch (action.type) {
    case EDeviceActions.GetDevice: {
        return {
          ...state
        }}
    case EDeviceActions.GetDevicesSuccess: {
      return {
        ...state,
        devices: action.payload
      };
    }
    case EDeviceActions.GetDeviceSuccess: {
      return {
        ...state,
        selectedDevice: action.payload
      };
    }

    default:
      return state;
  }
};
