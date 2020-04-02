import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { DevicesComponent } from './containers/devices/devices/devices.component';
import { DeviceComponent } from './containers/device/device/device.component';

const routes: Routes = [
  { path: 'devices', component: DevicesComponent },
  { path: 'device/:id', component: DeviceComponent },
  { path: '', redirectTo: '/devices', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
