import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  AppComponent,
  ShowLocationComponent
} from './app.component';

import {WorldsimService} from '../../projects/worldsim/src/lib/worldsim.service';
import {ShowMapComponent} from './show-map.component';
import {ShowMapLocationComponent} from './show-map-location.component';
import {ShowMapReceiverComponent} from './show-map-receiver.component';
import {ShowMapEmitterComponent} from './show-map-emitter.component';
import {ShowMapLampComponent} from './show-map-lamp.component';
import {ConfigureComponent} from './configure.component';
import {ConfigureLampComponent} from './configure-lamp.component';
import {FormsModule} from '@angular/forms';
import {ShowMapTvComponent} from './show-map-tv.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowLocationComponent,
    ShowMapComponent,
    ShowMapLocationComponent,
    ShowMapReceiverComponent,
    ShowMapEmitterComponent,
    ShowMapLampComponent,
    ShowMapTvComponent,
    ConfigureComponent,
    ConfigureLampComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [WorldsimService],
  bootstrap: [AppComponent]
})
export class AppModule { }
