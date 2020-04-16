import { IDeviceEvents } from './../models/deviceEvents.interface';
import { IDevice } from './../models/device.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { map } from 'rxjs/operators';
import { IDeviceHttp } from '../models/http-models/device-http.interface';
import { DeviceTelemetry } from '../models/device-telemetry';
import * as jwt_decode from 'jwt-decode';
@Injectable()
export class DeviceService {


  selectedDeviceId: number;
  userName = sessionStorage.getItem("msal.idtoken") ? jwt_decode(sessionStorage.getItem('msal.idtoken')).given_name.toLowerCase() : "naman";

  private deviceMeetadataUrl = 'https://cosmos-db-api-1584105173809.azurewebsites.net/epredia/v1/1/metadata';
  devices: any = [];

  // console.log('connecting to server');
  constructor(private http: HttpClient) {

  }

  getDevices(): Observable<any> {

    const _deviceUrl = 'https://epredia-cosmosdb-apis.azurewebsites.net/api/getUserDeviceDetails'
    // const _deviceUrl = 'https://epredia-cosmosdb-apis.azurewebsites.net/api/'+ this.userName+'/devices';
    // return this.http.get<IDeviceHttp>(_deviceUrl).pipe(
    return this.http.get<IDeviceHttp>(_deviceUrl, { headers: new HttpHeaders().set('x-ms-client-principal-id', this.userName) }).pipe(
      map((res: any) => {
        return res.deviceInfo
      }),
      catchError(this.handleError));

  }


  getDeviceMetadata(device: IDevice) {
    const header = new HttpHeaders().set('x-ms-client-principal-deviceId', '' + device._id).set('Access-Control-Allow-Origin', '*');
    const url = 'https://epredia-cosmosdb-apis.azurewebsites.net/api/getDeviceMetadata';
    return this.http.get(url, { headers: header }).pipe(
      catchError(this.handleError)
    );

  }

  /**
   * @description: get device Events
   * @param deviceId: [ string ] device id of selected device
   */

  getDeviceEvents(deviceId: string): Observable<IDeviceEvents[]> {

    console.log('events id ' + JSON.stringify(deviceId));
    const header = new HttpHeaders().set('x-ms-client-principal-deviceId', '' + deviceId).set('x-ms-client-principal-eventType', '').set('Access-Control-Allow-Origin', '*');
    const url = 'https://epredia-cosmosdb-apis.azurewebsites.net/api/getDeviceEvents';
    return this.http.get(url, { headers: header }).pipe(
      map((res: any) => res.deviceEvents.messages),
      catchError(() => [])
    );

  }




  //  get telemetry data
  /**
 * @description: get telemetry data of last 1 hour
 * @param deviceId:[ device id ]
 */
  getLastHourTelemetryData(deviceId: string): Observable<DeviceTelemetry[]> {

    const header = new HttpHeaders().set('x-ms-client-principal-deviceId', '' + deviceId).set('Access-Control-Allow-Origin', '*');;

    // const url = 'https://epredia-cosmosdb-apis.azurewebsites.net/api/' + this.userName + '/' + deviceId + '/telemetry/last/' + 10000;
    const url = 'https://epredia-cosmosdb-apis.azurewebsites.net/api/getDeviceTelemetry';
    return this.http.get(url).pipe(
      map((res: any) => res.deviceTelemetry.messages)
    );
  }

  /**
   * @description: get telemetry data of last 1 hour
   * @param deviceId:[ device id ]
   */
  getTimeSpecificTelemetryData(deviceId: string, time: string): Observable<DeviceTelemetry[]> {
    const url = 'https://epredia-cosmosdb-apis.azurewebsites.net/api/' + this.userName + '/' + deviceId + '/telemetry/last/' + time;
    return this.http.get(url).pipe(
      map((res: any) => res.deviceTelemetry.messages)
    );
  }

  getTelemetryByRange(from: string, to: string): Observable<any> {
    const range = {
      from: from,
      to: to
    }
    const header = new HttpHeaders().set('x-ms-client-principal-deviceId', '' + this.selectedDeviceId).set('Access-Control-Allow-Origin', '*')
      .set('x-ms-client-principal-range', '' + JSON.stringify(range));

    const url = 'https://epredia-cosmosdb-apis.azurewebsites.net/api/getDeviceTelemetry';
    const body = {
      from: new Date(from).toISOString(),
      to: new Date(to).toISOString()
    }
    return this.http.get(url, { headers: header }).pipe(
      map((res: any) => res.deviceTelemetry.messages));

  }


  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return Observable.throw(err.error() || 'Server error');
  }
  // Used for Handshaking with Signal R (Web Socket connection )
  ConnectHubWithSignalR(): Observable<any> {

    const url = 'https://epredia-cosmosdb-apis.azurewebsites.net/api/negotiate';
    // const url = 'https://epredia-azure-functions-epredia.azurewebsites.net/api/negotiate';
    return this.http.post(url, {}, { headers: new HttpHeaders().set('x-ms-client-principal-id', this.userName) });

  }

  getDeviceNotifications(action: IDevice[]): Observable<IDeviceEvents[][]> {

    const obsList$ = action.map(e => this.getDeviceEvents('' + e._id));
    return forkJoin(obsList$);
  }

  getPressureChamber(): Observable<any> {

    const url = '../../assets/json/pressure_chamber.json';
    return this.http.get(url);
  }
  getSpecificGravity(): Observable<any> {

    const url = '../../assets/json/specific_gravity.json';
    return this.http.get(url);
  }
  getTempratureFluid(): Observable<any> {

    const url = '../../assets/json/temperature_chamber_fluid_2 (1).json';
    return this.http.get(url);
  }
  getTempWaxBath1(): Observable<any> {

    const url = '../../assets/json/temperature_waxbath_fluid_1.json';
    return this.http.get(url);
  }
  getTempWaxBath3(): Observable<any> {

    const url = '../../assets/json/temperature_waxbath_fluid_3.json';
    return this.http.get(url);
  }
}

