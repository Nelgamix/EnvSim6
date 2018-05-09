import {Component, Input} from '@angular/core';
import {Lamp} from '../../projects/worldsim/src/lib/model/objects/Lamp';

@Component({
  selector: 'app-configure-lamp',
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
          name="lamp-color"
          placeholder="Color"
          [(ngModel)]="lamp.color">
      </mat-form-field>
      <mat-form-field class="full-width">
        <input
          matInput
          name="lamp-intensity"
          placeholder="Intensity"
          [(ngModel)]="lamp.intensity"
          type="number"
          step="0.05"
          min="0"
          max="1">
      </mat-form-field>
    </form>
  `
})
export class ConfigureLampComponent {
  @Input() lamp: Lamp;
}
