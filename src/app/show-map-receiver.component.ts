import {Component, Input} from '@angular/core';
import {Lamp} from '../../projects/worldsim/src/lib/model/Lamp';
import {TV} from '../../projects/worldsim/src/lib/model/TV';
import {Receiver} from '../../projects/worldsim/src/lib/model/Receiver';

@Component({
  selector: 'app-show-map-receiver',
  template: `
    <div [style.top]="(receiver.position.y * magnificationY) + 'px'"
         [style.left]="(receiver.position.x * magnificationX) + 'px'"
         [style.width]="24 + 'px'"
         [style.height]="24 + 'px'"
          style="position: absolute;">
      <app-show-map-lamp *ngIf="Lamp.isInstance(receiver)" [lamp]="receiver" [onConfigure]="onConfigure"></app-show-map-lamp>
      <app-show-map-tv *ngIf="TV.isInstance(receiver)" [tv]="receiver" [onConfigure]="onConfigure"></app-show-map-tv>
    </div>
  `
})
export class ShowMapReceiverComponent {
  @Input() receiver: Receiver;
  @Input() onConfigure: (Obj) => void;

  @Input() magnificationX: number;
  @Input() magnificationY: number;

  Lamp = Lamp;
  TV = TV;
}
