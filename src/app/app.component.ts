import {Component, Input} from '@angular/core';
import {WorldsimService} from '../../projects/worldsim/src/lib/worldsim.service';
import {Lamp} from '../../projects/worldsim/src/lib/model/receiver/Lamp';
import {Obj} from '../../projects/worldsim/src/lib/model/Obj';
import {Location} from '../../projects/worldsim/src/lib/model/Location';

@Component({
  selector: 'app-show-location',
  styles: [
    `
      .red {
        color: red;
      }
      .green {
        color: limegreen;
      }
    `
  ],
  template: `
    <b>{{ location.name }}</b> &rArr;
    <span class="red">{{location.width}}x{{location.height}}</span>
    at <span class="green">({{location.position.x + ', ' + location.position.y}})</span>
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
  readonly magnificationX: number = 2.6;
  readonly magnificationY: number = 1.8;

  configure: Obj;

  constructor(public worldsimService: WorldsimService) {
    this.worldsimService.loadEnvironment({
      'objects': [
        {
          'type': 'Lamp',
          'position': {
            'x': 260,
            'y': 270
          },
          'name': 'Lampe du salon',
          'color': '#fff',
          'intensity': 0.8
        },
        {
          'type': 'Lamp',
          'position': {
            'x': 4,
            'y': 220
          },
          'name': 'Lampe de Chambre 1',
          'color': '#f55',
          'intensity': 0.5
        },
        {
          'type': 'Lamp',
          'position': {
            'x': 4,
            'y': 270
          },
          'name': 'Lampe de Chambre 2',
          'color': '#55f',
          'intensity': 0.5
        },
        {
          'type': 'TV',
          'position': {
            'x': 260,
            'y': 100
          },
          'name': 'TV du salon',
          'channel': 1,
          'volume': 0.2
        },
        {
          'type': 'Thermometer',
          'position': {
            'x': 260,
            'y': 10
          },
          'name': 'Thermometre du salon',
          'temperature': 22
        }
      ],
      'locations': [
        {
          'name': 'Entrée',
          'width': 80,
          'height': 100,
          'position': {
            x: 0,
            y: 0
          }
        },
        {
          'name': 'Cuisine',
          'width': 120,
          'height': 100,
          'position': {
            x: 80,
            y: 0
          },
          'avatars': [{name: 'Alice'}]
        },
        {
          'name': 'Salon',
          'width': 100,
          'height': 300,
          'position': {
            x: 200,
            y: 0
          }
        },
        {
          'name': 'Couloir 1',
          'width': 200,
          'height': 30,
          'position': {
            x: 0,
            y: 100
          }
        },
        {
          'name': 'Couloir 2',
          'width': 30,
          'height': 170,
          'position': {
            x: 120,
            y: 130
          }
        },
        {
          'name': 'WC',
          'width': 50,
          'height': 40,
          'position': {
            x: 150,
            y: 130
          }
        },
        {
          'name': 'SDB',
          'width': 50,
          'height': 130,
          'position': {
            x: 150,
            y: 170
          }
        },
        {
          'name': 'Chambres',
          'width': 120,
          'height': 170,
          'position': {
            x: 0,
            y: 130
          },
          'sublocations': [
            {
              'name': 'Chambre 1',
              'width': 120,
              'height': 120,
              'position': {
                x: 0,
                y: 0
              },
              'avatars': [{name: 'Bob'}]
            },
            {
              'name': 'Chambre 2',
              'width': 120,
              'height': 50,
              'position': {
                x: 0,
                y: 120
              },
            }
          ]
        }
      ]
    });
  }

  onConfigure(param: Obj): void {
    this.configure = param;
  }

  get onConfigureBinded() {
    return this.onConfigure.bind(this);
  }
}
