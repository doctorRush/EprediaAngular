import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { IAppState } from '../../../store/state/app.state';
import { selectSelectedDevice } from '../../../store/selectors/device.selector';
import { GetDevice } from '../../../store/actions/device.actions';

@Component({
  selector: 'device-details',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  device$ = this._store.pipe(select(selectSelectedDevice));

  constructor(
    private _store: Store<IAppState>,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._store.dispatch(new GetDevice(this._route.snapshot.params.Id));
  }
}

