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
      }
    }

    case EDeviceActions.UpdateDevice: {

      return { ...state, devices: action.payload };
    }
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

    case EDeviceActions.GetDeviceMetadata: {
      return {
        ...state
      }
    }

    case EDeviceActions.GetDeviceMetadaSuccess: {
      return {
        ...state,
        deviceMetadata: action.payload
      }
    }
    case EDeviceActions.GetDeviceEventsSuccess: {
      return {
        ...state,
        deviceEvents: action.payload
      }
    }
    case EDeviceActions.updateDeviceMetadataSuccess: {
      return {
        ...state,
        deviceMetadata: action.payload
      }
    }

    case EDeviceActions.updateDeviceEventsSuccess: {

      const data = [... state.deviceEvents, ...action.payload];

      return {
        ...state,
        deviceEvents: data
      }
    }
    case EDeviceActions.UpdateDeviceTelemetrySuccess: {

      const data = [... state.deviceTelemetry, ...action.payload];

      return {
        ...state,
        deviceTelemetry: data
      }
    }
    case EDeviceActions.GetDeviceTelemetrySuccess: {
      return {
        ...state,
        deviceTelemetry: action.payload
      }
    }

    default:
      return state;
  }
};
