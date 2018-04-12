import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WorldsimService} from '../../projects/worldsim/src/lib/worldsim.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WorldsimService],
  bootstrap: [AppComponent]
})
export class AppModule { }
