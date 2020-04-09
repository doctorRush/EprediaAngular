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
import * as jwt_decode from 'jwt-decode';
@Injectable()
export class DeviceService {

  selectedDeviceId: number;


   //token = localStorage.getItem("msal.idtoken"||null);

   //decoded = jwt_decode(this.token);
  // userName = (this.decoded.given_name).toLowerCase()
  userName=sessionStorage.getItem("msal.idtoken")?jwt_decode(sessionStorage.getItem("msal.idtoken")).given_name.toLowerCase():"naman";

  private deviceMeetadataUrl = 'https://cosmos-db-api-1584105173809.azurewebsites.net/epredia/v1/1/metadata';
  devices: any = [];


  // console.log('connecting to server');
  constructor(private http: HttpClient) {

  }

  getDevices(): Observable<any> {

    const _deviceUrl = 'https://cosmos-db-api-epredia.azurewebsites.net/epredia/v1/'+ this.userName+'/devices';
    return this.http.get<IDeviceHttp>(_deviceUrl).pipe(
      map((res: any) => {
        return res.deviceInfo}),
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




  //  get telemetry data
    /**
   * @description: get telemetry data of last 1 hour
   * @param deviceId:[ device id ]
   */
  getLastHourTelemetryData(deviceId: string): Observable<DeviceTelemetry[]> {
    // const url = 'https://cosmos-db-api-epredia.azurewebsites.net/epredia/v1/' + this.userName + '/' + deviceId + '/telemetry/last/' + 10000;
    const url = 'https://cosmos-db-api-epredia.azurewebsites.net/epredia/v1/' + this.userName + '/' + deviceId + '/telemetry';
    return this.http.get(url).pipe(
      map((res: any) => res.deviceTelemetry.messages)
    );
  }

  /**
   * @description: get telemetry data of last 1 hour
   * @param deviceId:[ device id ]
   */
  getTimeSpecificTelemetryData(deviceId: string, time: string): Observable<DeviceTelemetry[]> {
    const url = 'https://cosmos-db-api-epredia.azurewebsites.net/epredia/v1/' + this.userName + '/' + deviceId + '/telemetry/last/' + time;
    return this.http.get(url).pipe(
      map((res: any) => res.deviceTelemetry.messages)
    );
  }

  getTelemetryByRange(from : string, to: string): Observable<any> {

    const url='https://cosmos-db-api-epredia.azurewebsites.net/epredia/v1/'+ this.userName+'/'+ this.selectedDeviceId+'/telemetry/range';
    const body = {
      from : new Date(from).toISOString(),
      to: new Date(to).toISOString()
    }
    return this.http.post(url,body).pipe(
      map((res: any) => res.deviceTelemetry.messages));

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

