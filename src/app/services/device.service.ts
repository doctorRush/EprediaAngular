import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { IDeviceHttp } from '../models/http-models/device-http.interface';

@Injectable()
export class DeviceService {
    private _deviceUrl = 'http://localhost:4200/assets/data.json';
    private _device2Url='https://cosmos-db-api-1584105173809.azurewebsites.net/epredia/v1/naman/devices';
    devices: any = [];
   
    constructor(private http: HttpClient) {
    }

    getDevices(): Observable<IDeviceHttp> {
                   
     
          //console.log("Naman"+this.http.get<IDeviceHttp>(this._device2Url));
        return this.http.get<IDeviceHttp>(this._device2Url).pipe(
              
               );
        
        
    }

   

    //private handleError(err: HttpErrorResponse) {
     //   console.log(err);
    //    return Observable.throw(err.error() || 'Server error');
    //}
}

