import {Component, HostListener, Input} from '@angular/core';
import {Location} from '../../../projects/worldsim/src/lib/model/Location';
import {Utils} from '../utils';
import {Avatar} from '../../../projects/worldsim/src/lib/model/Avatar';

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
    #display {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .ws-location-name {
      /*position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);*/
      font-size: 130%;
      z-index: 1;
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
      text-align: center;
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
      <div id="display">
        <div class="ws-location-name">
          <div style="font-weight: bold">{{location.name}}</div>
          <div class="ws-avatar" *ngFor="let a of location.avatars" [alx-draggable]="{location: location, avatar: a}">
            <i class="material-icons">person_pin</i>
            <span style="vertical-align: top">{{a.name}}</span>
          </div>
        </div>
      </div>
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

  dropped(e: {location: Location, avatar: Avatar}) {
    if (this.location === e.location) return;

    console.log('Dropped ' + e.avatar.name + ' from ' + e.location.name);
    this.location.addAvatar(e.avatar);
    e.location.removeAvatar(e.avatar);
  }
}
