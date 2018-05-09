import {Component, Input} from '@angular/core';
import {Thermometer} from '../../projects/worldsim/src/lib/model/objects/Thermometer';
import {Obj} from '../../projects/worldsim/src/lib/model/Obj';
import {Lamp} from '../../projects/worldsim/src/lib/model/objects/Lamp';
import {TV} from '../../projects/worldsim/src/lib/model/objects/TV';

@Component({
  selector: 'app-show-map-object',
  template: `
    <div [style.top]="(object.position.y * magnificationY) + 'px'"
         [style.left]="(object.position.x * magnificationX) + 'px'"
         [style.width]="24 + 'px'"
         [style.height]="24 + 'px'"
         style="position: absolute;">
      <app-show-map-thermometer
        *ngIf="Thermometer.isInstance(object)"
        [object]="object"
        [onConfigure]="onConfigure">
      </app-show-map-thermometer>
      <app-show-map-tv
        *ngIf="TV.isInstance(object)"
        [object]="object"
        [onConfigure]="onConfigure">
      </app-show-map-tv>
      <app-show-map-lamp
        *ngIf="Lamp.isInstance(object)"
        [object]="object"
        [onConfigure]="onConfigure">
      </app-show-map-lamp>
    </div>
  `
})
export class ShowMapObjectComponent {
  @Input() object: Obj;
  @Input() onConfigure: (Obj) => void;

  @Input() magnificationX: number;
  @Input() magnificationY: number;

  Thermometer = Thermometer;
  Lamp = Lamp;
  TV = TV;
}
