import {Component, Input} from '@angular/core';
import {TV} from '../../projects/worldsim/src/lib/model/objects/TV';
import {ShowMapObjectModifiable} from './show-map-object-modifiable';

@Component({
  selector: 'app-show-map-tv',
  template: `
    <div style="width: 96px" [ngStyle]="styles">
      <div style="width: 36px; display: inline-block">
        <i class="material-icons md-36" style="display: inline">tv</i>
      </div>
      <div style="display: inline-block">
        <span>{{object.channel}}</span> <br>
        <span>{{object.volume * 100 | number:'1.0-2'}}%</span>
      </div>
    </div>
  `
})
export class ShowMapTvComponent extends ShowMapObjectModifiable {
  @Input() object: TV;
}
