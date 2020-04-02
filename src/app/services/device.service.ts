import { IDeviceEvents } from './../models/deviceEvents.interface';
import { IDevice } from './../models/device.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { map } from 'rxjs/operators';
import { IDeviceHttp } from '../models/http-models/device-http.interface';
import { DeviceTelemetry } from '../models/device-telemetry';
import { environment } from 'src/environments/environment';
import { userInfo } from 'os';

@Injectable()
export class DeviceService {

 userName = environment.username;
  private _deviceUrl = 'https://cosmos-db-api-epredia.azurewebsites.net/epredia/v1/'+ this.userName+'/devices';
  private deviceMeetadataUrl = 'https://cosmos-db-api-1584105173809.azurewebsites.net/epredia/v1/1/metadata';
  devices: any = [];

  constructor(private http: HttpClient) {
  }

  getDevices(): Observable<any> {

    return this.http.get<IDeviceHttp>(this._deviceUrl).pipe(
      map((res: any) => res.deviceInfo),
      catchError(this.handleError));

  }


  getDeviceMetadata(device: IDevice) {
    const url = 'https://cosmos-db-api-epredia.azurewebsites.net/epredia/v1/'+ this.userName+'/' + device._id + '/metadata'
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
    const url = 'https://cosmos-db-api-epredia.azurewebsites.net/epredia/v1/'+ this.userName+'/' + deviceId + '/events';
    return this.http.get(url).pipe(
      map((res: any) => res.deviceEvents.messages),
      catchError(this.handleError)
    );

  }


  /**
   * @description: get telemetry data of last 1 hour
   * @param deviceId:[ device id ] 
   */
  getLastHourTelemetryData(deviceId: string): Observable<DeviceTelemetry[]> {
    const url = 'https://cosmos-db-api-epredia.azurewebsites.net/epredia/v1/'+ this.userName+'/' + deviceId + '/telemetry';
    return this.http.get(url).pipe(
      map((res: any) => res.deviceTelemetry.messages)
    );
  }

  /**
   * @description: get telemetry data of last 1 hour
   * @param deviceId:[ device id ] 
   */
  getTimeSpecificTelemetryData(deviceId: string, time: string): Observable<DeviceTelemetry[]> {
    const url = 'https://cosmos-db-api-epredia.azurewebsites.net/epredia/v1/'+ this.userName+'/' + deviceId + '/telemetry/last' + time;
    return this.http.get(url).pipe(
      map((res: any) => res.deviceTelemetry.messages)
    );
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return Observable.throw(err.error() || 'Server error');
  }
 // Used for Handshaking with Signal R (Web Socket connection )
  ConnectHubWithSignalR(): Observable<any> {

    const url = 'https://epredia-azure-functions-epredia.azurewebsites.net/api/negotiate';
    return this.http.post(url, {}, { headers: new HttpHeaders().set('x-ms-client-principal-id', this.userName) });

  }
}

