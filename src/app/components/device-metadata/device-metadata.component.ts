import { deviceMetadata } from './../../store/selectors/device.selector';
import { updateDeviceMetadata } from './../../store/actions/device.actions';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDeviceMetadata } from '../../models/deviceMetadata.interface';
import { timer, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-metadata',
  templateUrl: './device-metadata.component.html',
  styleUrls: ['./device-metadata.component.css']
})
export class DeviceMetadataComponent implements OnInit {

  devicemetadata: IDeviceMetadata[] = [];
  constructor(private _store: Store<IAppState>, private _router: Router) { }

  ngOnInit() {



    this._store.select(deviceMetadata).subscribe(
      metaData => {
        console.log('subscribe to device metatdata');
        console.log(metaData);
        this.devicemetadata = null;
        this.devicemetadata = metaData;
      }
    );

  }

}
