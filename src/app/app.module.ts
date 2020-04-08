import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { appReducers } from './store/reducers/app.reducers';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';

import { DeviceEffects } from './store/effects/device.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MainComponent } from './components/main.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceService } from './services/device.service';
import { DeviceDetailsComponent } from './components/device-details/device-details.component';

import { DevicesComponent } from './containers/devices/devices/devices.component';

import { DeviceComponent } from './containers/device/device/device.component';
import { DeviceMetadataComponent } from './components/device-metadata/device-metadata.component';
import { DeviceEventsComponent } from './components/device-events/device-events.component';
import { ChartComponent } from './components/chart/chart.component';
import { LoginComponent } from './components/login/login.component';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DeviceListComponent,
    DeviceDetailsComponent,
    DevicesComponent,
    DeviceComponent,
    DeviceMetadataComponent,
    DeviceEventsComponent,
    ChartComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,
    FormsModule,ReactiveFormsModule,
    HighchartsChartModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([DeviceEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    MsalModule.forRoot({
      auth: {
        clientId: 'cc288e39-e236-426b-8003-9b77343bbe15',
        authority: 'https://revosb2c.b2clogin.com/revosb2c.onmicrosoft.com/b2c_1_firstflow',
        redirectUri: 'http://localhost:4200/devices',
        validateAuthority: false,
        navigateToLoginRequestUrl: false,
      },
      cache: {
        cacheLocation: 'sessionStorage',
      },
    },
     {
       consentScopes: [
        'user.read',
         'openid',
        'profile',
      ],
       unprotectedResources: [],
      protectedResourceMap: [
         ['', ['user.read']]
     ],
      extraQueryParameters: {}
     }
    )
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
