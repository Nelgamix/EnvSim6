import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ShowMapObjectModifiable} from './show-map-object-modifiable';
import {Thermometer} from '../../projects/worldsim/src/lib/model/objects/Thermometer';
import {Utils} from './utils';

@Component({
  selector: 'app-show-map-thermometer',
  template: `
    <div style="width: 96px" [ngStyle]="styles">
      <app-show-map-slider
        *ngIf="mOn"
        [val]="object.temperature + modifier"
        [min]="Thermometer.TEMPERATURE_MIN"
        [max]="Thermometer.TEMPERATURE_MAX"
        [format]="'Temp.: %d°C'"
        [width]="96">
      </app-show-map-slider>
      <div style="width: 36px; display: inline-block">
        <i class="material-icons md-36" style="display: inline" [style.color]="iconColor">whatshot</i>
      </div>
      <div style="display: inline-block">
        <span>{{object.temperature}}°C</span>
      </div>
    </div>
  `
})
export class ShowMapThermometerComponent extends ShowMapObjectModifiable implements OnChanges {
  @Input() object: Thermometer;
  Thermometer = Thermometer;
  iconColor: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.iconColor = this.calculateIconColor();
  }

  calculateIconColor() {
    const cold = '0000ff';
    const hot = 'ff0000';
    const ratio = (this.object.temperature - Thermometer.TEMPERATURE_MIN) /
        (Thermometer.TEMPERATURE_MAX - Thermometer.TEMPERATURE_MIN);

    return Utils.scaleColor(ratio, cold, hot);
  }

  protected modify(modifier: number) {
    this.object.modifyTemperature(modifier);
  }
}
