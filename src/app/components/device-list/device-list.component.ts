import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IDevice} from '../../models/device.interface'
@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  @Input()
  devices: IDevice[];
  @Output()
  deviceSelected: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {console.log(this.devices)}

  navigateToDevice(id: number) {
    this.deviceSelected.emit(id);
  }
}

