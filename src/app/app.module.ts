import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { appReducers } from './store/reducers/app.reducers';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { DeviceEffects } from './store/effects/device.effects';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceService } from './services/device.service';
import { DeviceDetailsComponent } from './components/device-details/device-details.component';

import { DevicesComponent as DevicesContainerComponent } from './containers/devices/devices/devices.component';

import { DeviceComponent } from './containers/device/device/device.component';


@NgModule({
  declarations: [
    AppComponent,
 
    MainComponent,
 
    DeviceListComponent,
    DevicesContainerComponent,
    
    DeviceComponent,
    DeviceDetailsComponent
  
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([DeviceEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule
  ],
  providers: [DeviceService],
  bootstrap: [MainComponent]
})
export class AppModule { }
