import {Component, HostListener, Input} from '@angular/core';
import {Location} from '../../projects/worldsim/src/lib/model/Location';

@Component({
  selector: 'app-show-map-location',
  styles: [`
    .ws-location {
      position: absolute;
      /*border: 1px solid black;*/
    }
    .ws-location-name {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 130%;
    }
  `],
  template: `
    <div
      class="ws-location"
      [style.background-color]="color"
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
        {{location.name}}
        <span *ngFor="let p of location.personnages">
          <br>
          <i class="material-icons">person_pin</i>{{p.name}}
        </span>
      </span>
    </div>
  `
})
export class ShowMapLocationComponent {
  color: string = this.randomColor();

  @Input() location: Location;
  @Input() magnificationX: number;
  @Input() magnificationY: number;

  @HostListener('click') onClick() {
    console.log(this.location.name);
  }

  randomColor(): string {
    return 'rgb(' +
      Math.floor(64 + Math.random() * 192) + ', ' +
      Math.floor(64 + Math.random() * 192) + ', ' +
      Math.floor(64 + Math.random() * 192) + ')';
  }
}
