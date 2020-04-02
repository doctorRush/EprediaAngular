import { GetDevices } from '../../../store/actions/device.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../../store/state/app.state';
import { selectDeviceList } from '../../../store/selectors/device.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'device-list',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  devices$ = this._store.select(selectDeviceList);

  constructor(private _store: Store<IAppState>, private _router: Router) {}

  ngOnInit() {
    this._store.subscribe(
      res=> {
        console.log(res);

      }
    );
    this._store.select(selectDeviceList).subscribe( res => {
      console.log(res);
          });
    this._store.dispatch(new GetDevices());
    console.log(selectDeviceList);
    console.log(this.devices$);
  }

  navigateToDevice(id: number) {
    this._router.navigate(['device', id]);
  }
}
