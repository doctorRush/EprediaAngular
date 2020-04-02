import { IDeviceEvents } from './../models/deviceEvents.interface';
import { IDevice } from './../models/device.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { map } from 'rxjs/operators';


import { IDeviceHttp } from '../models/http-models/device-http.interface';

@Injectable()
export class DeviceService {
  private _deviceUrl = 'https://cosmos-db-api-epredia.azurewebsites.net/epredia/v1/naman/devices';
  private deviceMeetadataUrl = 'https://cosmos-db-api-epredia.azurewebsites.net/epredia/v1/1/metadata';
  devices: any = [];

  constructor(private http: HttpClient) {
  }

  getDevices(): Observable<any> {

    return this.http.get<IDeviceHttp>(this._deviceUrl).pipe(
      map((res: any) => res.deviceInfo),
      catchError(this.handleError));

  }


  getDeviceMetadata(device: IDevice) {
    const url = 'https://cosmos-db-api-epredia.azurewebsites.net/epredia/v1/naman/' + device._id + '/metadata'
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );

  }

  /**
   * @description: get device Events
   * @param deviceId: [ string ] device id of selected device
   */

  getDeviceEvents(deviceId: string): Observable<IDeviceEvents[]> {

    console.log('events id ' + JSON.stringify(deviceId));
    const url = 'https://cosmos-db-api-epredia.azurewebsites.net/epredia/v1/naman/' + deviceId + '/events';
    return this.http.get(url).pipe(
      map((res: any) => res.deviceEvents.messages),
      catchError(this.handleError)
    );

  }


  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return Observable.throw(err.error() || 'Server error');
  }
  
}

