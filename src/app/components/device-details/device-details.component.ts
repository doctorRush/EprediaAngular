import { selectDeviceList, selectSelectedDevice } from './../../store/selectors/device.selector';
import { IAppState } from './../../store/state/app.state';
import { Component, OnInit, Input } from '@angular/core';

import { IDevice } from '../../models/device.interface';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  @Input()
  device: IDevice;

  constructor(private _store: Store<IAppState>, private _router: Router) { }

  ngOnInit() {
    this._store.select(selectSelectedDevice).subscribe(res => {
      console.log(res);
      this.device = res;
    });
  }

}
