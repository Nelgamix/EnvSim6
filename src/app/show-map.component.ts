import {Component, Input} from '@angular/core';
import {World} from '../../projects/worldsim/src/lib/model/World';

@Component({
  selector: 'app-show-map',
  styles: [`
    #container {
      position: relative;
      border: 2px solid black
    }
  `],
  template: `
    <div id="container"
         class="no-select"
         alx-dragdrop
         [style.height]="world.calculateHeight() * magnificationY + 'px'"
         [style.width]="world.calculateWidth() * magnificationX + 'px'">
      <app-show-map-location
        *ngFor="let l of world.locations"
        [location]="l"
        [magnificationX]="magnificationX"
        [magnificationY]="magnificationY">
      </app-show-map-location>
      <app-show-map-object
        *ngFor="let o of world.objects"
        [object]="o"
        [magnificationX]="magnificationX"
        [magnificationY]="magnificationY"
        [onConfigure]="onConfigure">
      </app-show-map-object>
    </div>
  `
})
export class ShowMapComponent {
  @Input() world: World;
  @Input() onConfigure: (Obj) => void;
  @Input() magnificationX: number;
  @Input() magnificationY: number;
}
