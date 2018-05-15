import {Component, Input} from '@angular/core';
import {Thermometer} from '../../../projects/worldsim/src/lib/model/objects/Thermometer';

@Component({
  selector: 'app-configure-thermometer',
  styles: [
    `
      .full-width {
        width: 100%;
      }
    `
  ],
  template: `
    <form>
      <mat-form-field class="full-width">
        <input
          matInput
          name="temp-color"
          placeholder="Temperature"
          type="number"
          step="1"
          [min]="Thermometer.TEMPERATURE_MIN"
          [max]="Thermometer.TEMPERATURE_MAX"
          [(ngModel)]="thermometer.temperature">
      </mat-form-field>
    </form>
  `
})
export class ConfigureThermometerComponent {
  @Input() thermometer: Thermometer;
  Thermometer = Thermometer;
}
