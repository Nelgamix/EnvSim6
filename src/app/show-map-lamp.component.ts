import {Component, Input} from '@angular/core';
import {Lamp} from '../../projects/worldsim/src/lib/model/receiver/Lamp';
import {ShowMapEmitter} from './show-map-emitter';

@Component({
  selector: 'app-show-map-lamp',
  template: `
    <div style="width: 96px" class="no-select" [style.background-color]="background">
      <app-show-map-slider
        *ngIf="mOn"
        [val]="100 * (lamp.intensity + modifier / 100)"
        [format]="'Intensity: %d%'"
        [width]="96">
      </app-show-map-slider>
      <div style="width: 36px; display: inline-block">
        <i class="material-icons md-36" style="display: inline" [style.color]="lamp.color">lightbulb_outline</i>
      </div>
      <div style="display: inline-block">
        <span>{{lamp.color}}</span> <br>
        <span>{{lamp.intensity * 100 | number:'1.0-2'}}%</span>
      </div>
    </div>
  `
})
export class ShowMapLampComponent extends ShowMapEmitter {
  @Input() lamp: Lamp;
  @Input() onConfigure: (Obj) => void;
}
