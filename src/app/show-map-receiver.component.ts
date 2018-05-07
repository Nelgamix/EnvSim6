import {Component, Input} from '@angular/core';
import {Lamp} from '../../projects/worldsim/src/lib/model/Lamp';
import {Receiver} from '../../projects/worldsim/src/lib/model/Receiver';

@Component({
  selector: 'app-show-map-receiver',
  template: `
    <div [style.top]="(receiver.position.y) + 'px'"
         [style.left]="(receiver.position.x) + 'px'"
         [style.width]="16 + 'px'"
         [style.height]="16 + 'px'"
          style="position: absolute;">
      <div *ngIf="instanceOfLamp()">
        <i class="material-icons">lightbulb_outline</i>
      </div>
    </div>
  `
})
export class ShowMapReceiverComponent {
  @Input() receiver: Receiver;

  instanceOfLamp(): boolean {
    return this.receiver instanceof Lamp;
  }
}
