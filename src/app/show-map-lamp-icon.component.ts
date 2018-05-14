import {Component, Input} from '@angular/core';
import {Lamp} from '../../projects/worldsim/src/lib/model/objects/Lamp';

@Component({
  selector: 'app-show-map-lamp-icon',
  styles: [`
    /* Si besoin des border en inside, la passer sur un pseudo element ::after */
    #t {
      width: 500px;
      height: 500px;
      position: relative;
    }
    /* #t > div */
    #t25, #t50, #t75, #t100, #tu {
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      border: 1px dashed orange;
      transform: translate(-50%, -50%);
    }
    #tu {
      width: 37%;
      height: 37%;
      border: 2px solid hsl(200, 100%, 50%);
    }
    #t25 {
      width: 25%;
      height: 25%;
      border-color: green;
    }
    #t50 {
      width: 50%;
      height: 50%;
    }
    #t75 {
      width: 75%;
      height: 75%;
    }
    #t100 {
      width: 100%;
      height: 100%;
      border-color: red;
    }
  `],
  template: `
    <div id="t" [style.height]="dimens+'px'" [style.width]="dimens+'px'">
      <div id="t25"></div>
      <div id="t50"></div>
      <div id="t75"></div>
      <div id="t100"></div>
      <div id="tu"
           [style.height]="(object.intensity*100)+'%'"
           [style.width]="(object.intensity*100)+'%'"
           [style.border-color]="object.color"></div>
    </div>
  `
})
export class ShowMapLampIconComponent {
  @Input() object: Lamp;
  @Input() dimens: number;
}
