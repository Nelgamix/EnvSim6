import {Component, Input} from '@angular/core';
import {Emitter} from '../../projects/worldsim/src/lib/model/Emitter';

@Component({
  selector: 'app-show-map-emitter',
  template: `
  `
})
export class ShowMapEmitterComponent {
  @Input() emitter: Emitter;
  @Input() magnificationX: number;
  @Input() magnificationY: number;
}
