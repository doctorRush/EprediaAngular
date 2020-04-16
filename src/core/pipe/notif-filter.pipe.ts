import { IDeviceEvents } from './../../app/models/deviceEvents.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notifFilter'
})
export class NotifFilterPipe implements PipeTransform {

  transform(value: IDeviceEvents[], ...args: any[]): any {

    switch (args[0]) {
      case 0:

      return value.filter(ev => ev.eventParameters.event_type == 'FAULT_STATUS');

      case 1:
        return value.filter(ev => ev.eventParameters.event_type == 'WARNING_STATUS');
      default:
        return value.filter(ev => ev.eventParameters.event_type == 'ACTIVITY_STATUS');

    }
    // return null;
  }

}
