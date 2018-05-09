import {Component, Input} from '@angular/core';
import {Lamp} from '../../projects/worldsim/src/lib/model/objects/Lamp';
import {ShowMapObjectModifiable} from './show-map-object-modifiable';

@Component({
  selector: 'app-show-map-lamp',
  template: `
    <div style="width: 96px" [ngStyle]="styles">
      <div style="width: 36px; display: inline-block">
        <i class="material-icons md-36" style="display: inline" [style.color]="object.color">lightbulb_outline</i>
      </div>
      <div style="display: inline-block">
        <span>{{object.color}}</span> <br>
        <span>{{object.intensity * 100 | number:'1.0-2'}}%</span>
      </div>
    </div>
  `
})
export class ShowMapLampComponent extends ShowMapObjectModifiable {
  @Input() object: Lamp;
  @Input() onConfigure: (Obj) => void;
}
