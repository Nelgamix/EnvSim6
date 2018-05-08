import {Component, Input} from '@angular/core';
import {Obj} from '../../projects/worldsim/src/lib/model/Obj';
import {Lamp} from '../../projects/worldsim/src/lib/model/receiver/Lamp';
import {TV} from '../../projects/worldsim/src/lib/model/receiver/TV';
import {Thermometer} from '../../projects/worldsim/src/lib/model/emitters/Thermometer';
import {LightSensor} from '../../projects/worldsim/src/lib/model/emitters/LightSensor';

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
