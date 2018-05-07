import {Component, Input} from '@angular/core';
import {Lamp} from '../../projects/worldsim/src/lib/model/Lamp';

@Component({
  selector: 'app-configure-lamp',
  template: `
    <div>
      <form>
        <label for="color">Color:</label>
        <input type="text" [(ngModel)]="lamp.color" name="color"> <br>
        <label for="intensity">Intensity:</label>
        <input type="number" [(ngModel)]="lamp.intensity" name="intensity" step="0.05" min="0" max="1">
      </form>
    </div>
  `
})
export class ConfigureLampComponent {
  @Input() lamp: Lamp;
}
