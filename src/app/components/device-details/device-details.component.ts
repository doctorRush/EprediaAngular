import { Component, OnInit, Input } from '@angular/core';

import { IDevice } from '../../models/device.interface';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  @Input()
  device: IDevice;

  constructor() {}

  ngOnInit() {}
}
