import { IDeviceMetadata } from './../../models/deviceMetadata.interface';
import { GetDevices, GetDevice, getDeviceMetaData, getDeviceEvents, UpdateDevice, updateDeviceMetadata } from './../../store/actions/device.actions';
import { IAppState } from './../../store/state/app.state';
import { selectDeviceList, deviceMetadata, selectSelectedDevice } from './../../store/selectors/device.selector';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IDevice } from '../../models/device.interface';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { timer, Observable } from 'rxjs';
@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  @ViewChild('modalBtn', { static: true }) modalBtn: ElementRef;
  devices$ = this._store.select(selectDeviceList);
  active = 0;
  @Output()
  deviceSelected = new EventEmitter<IDevice>();
  deviceMetaData$: Observable<any[]>;
  deviceList: any[];

  constructor(private _store: Store<IAppState>, private _router: Router) { }


  ngOnInit() {

    this.deviceMetaData$ = this._store.select(deviceMetadata);
    this._store.select(selectDeviceList).subscribe(res => {
      console.log(res);
    });
    // this._store.dispatch(new GetDevices());
    this._store.dispatch(new GetDevices());
    this._store.select(selectDeviceList).subscribe(
      deviceList => {
        this.deviceList = [];
        this.deviceList = deviceList;

      }
    );


  }

  navigateToDevice(device: IDevice) {

    this._store.dispatch(new GetDevice(device._id));
    // this.dummyFunction();
    this._store.dispatch(new getDeviceMetaData(device));
    this._store.dispatch(new getDeviceEvents(device._id));
  }
  openModal() {
    const e = this.modalBtn.nativeElement as HTMLElement;
    e.click();
  }

  
}
