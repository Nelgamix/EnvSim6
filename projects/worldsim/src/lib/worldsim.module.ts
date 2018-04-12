import { NgModule } from '@angular/core';
import { WorldsimComponent } from './worldsim.component';
import {WorldsimService} from './worldsim.service';

@NgModule({
  imports: [
  ],
  declarations: [WorldsimComponent],
  exports: [WorldsimComponent, WorldsimService]
})
export class WorldsimModule { }
