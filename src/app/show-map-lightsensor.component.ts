import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ShowMapObjectModifiable} from './show-map-object-modifiable';
import {LightSensor} from '../../projects/worldsim/src/lib/model/objects/LightSensor';
import {Utils} from './utils';

@Component({
  selector: 'app-show-map-lightsensor',
  template: `
    <div style="width: 96px" [ngStyle]="styles">
      <app-show-map-slider
        *ngIf="mOn"
        [val]="emitter.light + modifier"
        [min]="LightSensor.LIGHT_MIN"
        [max]="LightSensor.LIGHT_MAX"
        [format]="'Light: %d'"
        [width]="96">
      </app-show-map-slider>
      <div style="width: 36px; display: inline-block">
        <i class="material-icons md-36" style="display: inline" [style.color]="iconColor">wb_sunny</i>
      </div>
      <div style="display: inline-block">
        <span>{{emitter.light}}</span>
      </div>
    </div>
  `
})
export class ShowMapLightSensorComponent extends ShowMapObjectModifiable implements OnChanges {
  @Input() object: LightSensor;

  LightSensor = LightSensor;

  iconColor: string;

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
