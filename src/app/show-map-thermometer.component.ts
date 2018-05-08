import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ShowMapEmitter} from './show-map-emitter';
import {Thermometer} from '../../projects/worldsim/src/lib/model/emitters/Thermometer';
import {Utils} from './utils';

@Component({
  selector: 'app-show-map-thermometer',
  template: `
    <div style="width: 96px" class="no-select" [style.background-color]="background">
      <app-show-map-slider
        *ngIf="mOn"
        [val]="emitter.temperature + modifier"
        [min]="Thermometer.TEMPERATURE_MIN"
        [max]="Thermometer.TEMPERATURE_MAX"
        [format]="'Temp.: %d°C'"
        [width]="96">
      </app-show-map-slider>
      <div style="width: 36px; display: inline-block">
        <i class="material-icons md-36" style="display: inline" [style.color]="iconColor">whatshot</i>
      </div>
      <div style="display: inline-block">
        <span>{{emitter.temperature}}°C</span>
      </div>
    </div>
  `
})
export class ShowMapThermometerComponent extends ShowMapEmitter implements OnChanges {
  @Input() emitter: Thermometer;
  Thermometer = Thermometer;
  iconColor: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.iconColor = this.calculateIconColor();
  }

  calculateIconColor() {
    const cold = '0000ff';
    const hot = 'ff0000';
    const ratio = (this.emitter.temperature - Thermometer.TEMPERATURE_MIN) /
        (Thermometer.TEMPERATURE_MAX - Thermometer.TEMPERATURE_MIN);

    return Utils.scaleColor(ratio, cold, hot);
  }

  protected modify(modifier: number) {
    this.emitter.modifyTemperature(modifier);
  }
}
