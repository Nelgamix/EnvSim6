import {Component, HostListener, Input} from '@angular/core';
import {Location} from '../../projects/worldsim/src/lib/model/Location';
import {Utils} from './utils';
import {Avatar} from '../../projects/worldsim/src/lib/model/Avatar';

@Component({
  selector: 'app-show-map-location',
  styles: [`
    .ws-location {
      position: absolute;
    }
    .ws-location::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      border: 2px solid black;
    }
    .ws-location-name {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 130%;
    }
    .can-drop {
    }
    .can-drop::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 2;
      border: 2px solid red;
    }
    .ws-avatar {
      cursor: pointer;
    }
    .ws-avatar:hover {
      color: red;
    }
  `],
  template: `
    <div
      class="ws-location"
      alx-dropzone
      (alx-ondrop)="dropped($event)"
      [style.background-color]="color"
      alx-drag-over-css="can-drop"
      [style.top]="(location.position.y * magnificationY) + 'px'"
      [style.left]="(location.position.x * magnificationX) + 'px'"
      [style.width]="(location.width * magnificationX) + 'px'"
      [style.height]="(location.height * magnificationY) + 'px'">
      <app-show-map-location
        *ngFor="let s of location.sublocations"
        [location]="s"
        [magnificationY]="magnificationY"
        [magnificationX]="magnificationX">
      </app-show-map-location>
      <span *ngIf="location.sublocations.length === 0" class="ws-location-name">
        <b>{{location.name}}</b>
        <span *ngFor="let a of location.avatars"
              class="ws-avatar"
              [alx-draggable]="a"
              (alx-drag-end)="endDragged($event)">
          <br>
          <i class="material-icons">person_pin</i>{{a.name}}
        </span>
      </span>
    </div>
  `
})
export class ShowMapLocationComponent {
  color: string = Utils.randomColor(80);

  @Input() location: Location;
  @Input() magnificationX: number;
  @Input() magnificationY: number;

  @HostListener('click') onClick() {
    console.log(this.location.name);
  }

  dropped(a: Avatar) {
    console.log('Dropped ' + a.name + ' on ' + this.location.name);
    this.location.addAvatar(a);
  }

  endDragged(a: Avatar) {
    console.log('Removing ' + a.name + ' from ' + this.location.name);
    this.location.removeAvatar(a);
  }
}
