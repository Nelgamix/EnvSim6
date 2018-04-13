import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent, ShowLocationComponent} from './app.component';
import {WorldsimService} from '../../projects/worldsim/src/lib/worldsim.service';

@NgModule({
  declarations: [
    AppComponent,
    ShowLocationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WorldsimService],
  bootstrap: [AppComponent]
})
export class AppModule { }
