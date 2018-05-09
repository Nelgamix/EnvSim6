import {Component, Input} from '@angular/core';
import {Obj} from '../../projects/worldsim/src/lib/model/Obj';
import {Lamp} from '../../projects/worldsim/src/lib/model/objects/Lamp';
import {TV} from '../../projects/worldsim/src/lib/model/objects/TV';
import {Thermometer} from '../../projects/worldsim/src/lib/model/objects/Thermometer';
import {LightSensor} from '../../projects/worldsim/src/lib/model/objects/LightSensor';

@Component({
  selector: 'app-configure',
  templateUrl: 'configure.component.html',
  styleUrls: ['configure.component.css']
})
export class ConfigureComponent {
  @Input() obj: Obj;

  Lamp = Lamp;
  TV = TV;
  Thermometer = Thermometer;
  LightSensor = LightSensor;
}
