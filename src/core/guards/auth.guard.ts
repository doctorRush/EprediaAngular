import { DeviceService } from './../../app/services/device.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private deviceService: DeviceService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   const token=sessionStorage.getItem("msal.idtoken");
   if (token){
this.deviceService.userName = jwt_decode(sessionStorage.getItem("msal.idtoken")).given_name.toLowerCase();
     return true;
    }
      else
      {
 this.router.navigate(["/login"]);
 return false;
      }
  }

}
