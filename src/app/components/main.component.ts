import { IDevice } from './../models/device.interface';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { IAppState } from '../store/state/app.state';
import { deviceMetadata } from '../store/selectors/device.selector';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit  {

  isActive = 0;
  selectDevice = null;
  devicemetadata: any;

  constructor(private _store: Store<IAppState>, private _router: Router) { }

  ngOnInit() {
    
  }


  selectedDevice(device: IDevice) {


  }

}
