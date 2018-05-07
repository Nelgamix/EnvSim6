import {Component, HostListener, Input} from '@angular/core';
import {WorldsimService} from '../../projects/worldsim/src/lib/worldsim.service';
import {Emitter} from '../../projects/worldsim/src/lib/model/Emitter';
import {Receiver} from '../../projects/worldsim/src/lib/model/Receiver';
import {Lamp} from '../../projects/worldsim/src/lib/model/Lamp';

@Component({
  selector: 'app-show-location',
  template: `
    {{ location.name }} -> {{ location.width }}x{{ location.height }}
    at [{{ location.position.x + ', ' + location.position.y }}]
    <ul *ngIf="location.sublocations.length > 0">
      <li *ngFor="let l of location.sublocations"><app-show-location [location]="l"></app-show-location></li>
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
  readonly magnificationX: number = 3;
  readonly magnificationY: number = 2;

  constructor(public worldsimService: WorldsimService) {
    this.worldsimService.loadEnvironment({
      'objects': [
        {
          'type': 'Lamp',
          'position': {
            'x': 0,
            'y': 0
          },
          'name': 'mini-test',
          'state': '#FFE'
        },
        {
          'type': 'Lamp',
          'position': {
            'x': 120,
            'y': 120
          },
          'name': 'Philips LMP1',
          'state': 'off'
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
          'personnages': [{name: 'Lucas'}]
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
              }
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
}
