import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {LightSensor} from '../../../projects/worldsim/src/lib/model/objects/LightSensor';
import {Utils} from '../utils';

@Component({
  selector: 'app-show-map-lightsensor',
  template: `
    <app-show-map-object-template
        [object]="object"
        [props]="props"
        [onConfigure]="onConfigure"
        [modifiable]="true"
        [modificationValue]="object.light"
        [modificationMin]="LightSensor.LIGHT_MIN"
        [modificationMax]="LightSensor.LIGHT_MAX"
        [modificationFormat]="format"
        [modification]="modify"
        displayName="Light Sensor">
      <div>
        <i class="material-icons md-36" [style.color]="iconColor">whatshot</i>
      </div>
    </app-show-map-object-template>
  `
})
export class ShowMapLightSensorComponent implements OnChanges {
  @Input() object: LightSensor;
  @Input() onConfigure: (Obj) => void;

  LightSensor = LightSensor;

  iconColor: string;
  format = 'Light: %d';

  props = [
    () => this.object.light
  ];

  ngOnChanges(changes: SimpleChanges): void {
    this.iconColor = this.calculateIconColor();
  }

  calculateIconColor() {
    const dark = '000000';
    const bright = 'ffffff';

    const ratio = (this.object.light - LightSensor.LIGHT_MIN) /
      (LightSensor.LIGHT_MAX - LightSensor.LIGHT_MIN);

    return Utils.scaleColor(ratio, dark, bright);
  }

  protected modify(modifier: number) {
    this.object.modifyLight(modifier);
  }
}
