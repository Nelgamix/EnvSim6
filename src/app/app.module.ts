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

@NgModule({
  declarations: [
    AppComponent,
    ShowLocationComponent,
    ShowMapComponent,
    ShowMapLocationComponent,
    ShowMapReceiverComponent,
    ShowMapEmitterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WorldsimService],
  bootstrap: [AppComponent]
})
export class AppModule { }
