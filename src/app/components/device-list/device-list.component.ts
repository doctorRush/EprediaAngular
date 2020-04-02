import { GetDevices, GetDevice, getDeviceMetaData, getDeviceEvents } from './../../store/actions/device.actions';
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

    this.deviceMetaData$ =  this._store.select(deviceMetadata);
    this._store.select(selectDeviceList).subscribe(res => {
      console.log(res);
    });
    timer(0,5000).subscribe(res=> {
      // this._store.dispatch(new GetDevices());
      this._store.dispatch(new GetDevices());
      console.log('calling api');
      this._store.select(selectDeviceList).subscribe(
        deviceList => {
          this.deviceList = [];
          this.deviceList = deviceList;

        }
      );
    
      this._store.select(selectSelectedDevice).subscribe(
        device => {
          this._store.dispatch(new getDeviceMetaData(device));
          

        }
      );
    });

  }

  navigateToDevice(device: IDevice) {
    // this.deviceSelected.emit(device);

    this._store.dispatch(new GetDevice(device._id));
    this._store.dispatch(new getDeviceMetaData(device));
  }
  openModal() {
    const e = this.modalBtn.nativeElement as HTMLElement;
    e.click();;
  }
}

