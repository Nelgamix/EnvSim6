import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  AppComponent,
  ShowLocationComponent
} from './app.component';

import {WorldsimService} from '../../projects/worldsim/src/lib/worldsim.service';
import {ShowMapComponent} from './show-map.component';
import {ShowMapLocationComponent} from './show-map-location.component';
import {ShowMapObjectComponent} from './show-map-object.component';
import {ShowMapLampComponent} from './show-map-lamp.component';
import {ConfigureComponent} from './configure.component';
import {ConfigureLampComponent} from './configure-lamp.component';
import {FormsModule} from '@angular/forms';
import {ShowMapTvComponent} from './show-map-tv.component';
import {DecimalPipe} from '@angular/common';
import {MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ShowMapSliderComponent} from './show-map-slider.component';
import {ShowMapThermometerComponent} from './show-map-thermometer.component';
import {ConfigureThermometerComponent} from './configure-thermometer.component';
import {DragDropModule} from 'alx-dragdrop';
import {ShowMapLampIconComponent} from './show-map-lamp-icon.component';
import {ShowMapObjectTemplateComponent} from './show-map-object-template.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowLocationComponent,
    ShowMapComponent,
    ShowMapLocationComponent,
    ShowMapObjectComponent,
    ShowMapObjectTemplateComponent,
    ShowMapLampComponent,
    ShowMapLampIconComponent,
    ShowMapTvComponent,
    ShowMapThermometerComponent,
    ShowMapSliderComponent,
    ConfigureComponent,
    ConfigureLampComponent,
    ConfigureThermometerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    DragDropModule
  ],
  providers: [
    WorldsimService,
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
