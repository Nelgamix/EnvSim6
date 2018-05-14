import {Component, Input} from '@angular/core';
import {Lamp} from '../../projects/worldsim/src/lib/model/objects/Lamp';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-show-map-lamp',
  template: `
    <app-show-map-object-template
        [object]="object"
        [props]="props"
        [onConfigure]="onConfigure"
        [modifiable]="false"
        displayName="Lamp">
      <app-show-map-lamp-icon [object]="object" [dimens]="36"></app-show-map-lamp-icon>
    </app-show-map-object-template>
  `
})
export class ShowMapLampComponent {
  @Input() object: Lamp;
  @Input() onConfigure: (Obj) => void;

  constructor(private decimalPipe: DecimalPipe) {}

  props = [
    // Intensity
    () => this.decimalPipe.transform(this.object.intensity * 100, '1.0-2') + '%',
    // Color
    () => this.object.color
  ];
}
