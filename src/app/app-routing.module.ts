import { MainComponent } from './components/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from './containers/device/device/device.component';
import { LoginComponent } from './components/login/login.component';
import { MsalGuard } from '@azure/msal-angular';
import { AuthGuard } from 'src/core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'devices', component: MainComponent,canActivate: [
      AuthGuard
    ]
  },
  { path: 'device/:id', component: DeviceComponent,canActivate: [
    AuthGuard
  ] },
  { path: '', redirectTo:"/login" ,pathMatch:"full"}

];

@NgModule({
 // imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
