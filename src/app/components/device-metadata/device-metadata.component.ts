
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IDeviceMetadata} from '../../models/deviceMetadata.interface';
import { timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { Router } from '@angular/router';
import { deviceMetadata } from 'src/app/store/selectors/device.selector';

@Component({
  selector: 'app-device-metadata',
  templateUrl: './device-metadata.component.html',
  styleUrls: ['./device-metadata.component.css']
})
export class DeviceMetadataComponent implements OnInit {

  devicemetadata: IDeviceMetadata[] = [];
  constructor(private _store: Store<IAppState>, private _router: Router) { }

  ngOnInit() {
    timer(0, 5000).subscribe( () => {
      this._store.select(deviceMetadata).subscribe(
       metaData => {
         this.devicemetadata = null;
         this.devicemetadata = metaData;
       }
      );
    });
  }

}
