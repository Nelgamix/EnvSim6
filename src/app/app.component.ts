import {Component, Input} from '@angular/core';
import {WorldsimService} from '../../projects/worldsim/src/lib/worldsim.service';
import {Obj} from '../../projects/worldsim/src/lib/model/Obj';
import {Location} from '../../projects/worldsim/src/lib/model/Location';
import {environments} from './environments';

@Component({
  selector: 'app-show-location',
  styles: [],
  template: `
    <b>{{ location.name }}</b> &rArr;
    <span class="list-dimensions">{{location.width}}x{{location.height}}</span>
    at <span class="list-location">({{location.position.x + ', ' + location.position.y}})</span>
    <ul *ngIf="location.sublocations.length > 0">
      <li *ngFor="let l of location.sublocations">
        <app-show-location [location]="l"></app-show-location>
      </li>
    </ul>
  `
})
export class ShowLocationComponent {
  @Input() location: Location;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  magnificationX = 1;
  magnificationY = 1;

  configure: Obj;

  constructor(public worldsimService: WorldsimService) {
    this.worldsimService.loadEnvironment(environments.maison);
    this.magnificationX = this.worldsimService.world.scale.x;
    this.magnificationY = this.worldsimService.world.scale.y;
  }

  onConfigure(param: Obj): void {
    this.configure = param;
  }

  get onConfigureBinded() {
    return this.onConfigure.bind(this);
  }
}
