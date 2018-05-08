import {Component, Input} from '@angular/core';
import {Emitter} from '../../projects/worldsim/src/lib/model/Emitter';
import {Thermometer} from '../../projects/worldsim/src/lib/model/emitters/Thermometer';

@Component({
  selector: 'app-show-map-emitter',
  template: `
    <div [style.top]="(emitter.position.y * magnificationY) + 'px'"
         [style.left]="(emitter.position.x * magnificationX) + 'px'"
         [style.width]="24 + 'px'"
         [style.height]="24 + 'px'"
         style="position: absolute;">
      <app-show-map-thermometer
        *ngIf="Thermometer.isInstance(emitter)"
        [emitter]="emitter"
        [onConfigure]="onConfigure">
      </app-show-map-thermometer>
    </div>
  `
})
export class ShowMapEmitterComponent {
  @Input() emitter: Emitter;
  @Input() onConfigure: (Obj) => void;

  @Input() magnificationX: number;
  @Input() magnificationY: number;

  Thermometer = Thermometer;
}
