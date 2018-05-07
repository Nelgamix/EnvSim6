import {Component, Input} from '@angular/core';
import {Obj} from '../../projects/worldsim/src/lib/model/Obj';
import {Lamp} from '../../projects/worldsim/src/lib/model/Lamp';

@Component({
  selector: 'app-configure',
  template: `
    <div style="padding: 10px 80px" *ngIf="obj != null">
      <h4>Configure panel</h4>
      <span>Configure {{obj.name}}</span> <br>
      <app-configure-lamp *ngIf="Lamp.isInstance(obj)" [lamp]="obj"></app-configure-lamp>
    </div>
  `
})
export class ConfigureComponent {
  @Input() obj: Obj;

  Lamp = Lamp;
}
