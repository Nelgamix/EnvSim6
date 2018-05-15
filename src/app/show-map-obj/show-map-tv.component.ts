import {Component, Input} from '@angular/core';
import {TV} from '../../../projects/worldsim/src/lib/model/objects/TV';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-show-map-tv',
  template: `
    <app-show-map-object-template
        [object]="object"
        [props]="props"
        [onConfigure]="onConfigure"
        [modifiable]="false"
        displayName="TV">
      <div>
        <i class="material-icons md-36">tv</i>
      </div>
    </app-show-map-object-template>
  `
})
export class ShowMapTvComponent {
  @Input() object: TV;
  @Input() onConfigure: (Obj) => void;

  constructor(private decimalPipe: DecimalPipe) {}

  props = [
    () => this.object.channel,
    () => this.decimalPipe.transform(this.object.volume * 100, '1.0-2') + '%'
  ];
}
