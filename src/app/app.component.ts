import {Component, Input} from '@angular/core';
import {WorldsimService} from '../../projects/worldsim/src/lib/worldsim.service';

@Component({
  selector: 'app-show-location',
  template: `
    {{ location.name }} -> {{ location.width }}x{{ location.height }} at {{ location.position.x + ',' + location.position.y }}
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
            'x': 10,
            'y': 120
          },
          'name': 'Philips LMP1',
          'state': 'off'
        }
      ],
      'locations': [
        {
          'name': 'Entree',
          'width': 100,
          'height': 200,
          'position': {
            x: 0,
            y: 0
          }
        },
        {
          'name': 'Chambre 1',
          'width': 400,
          'height': 400,
          'position': {
            x: 100,
            y: 200
          },
          'personnages': [{name: 'Lucas'}]
        },
        {
          'name': 'Chambre 2',
          'width': 400,
          'height': 400,
          'position': {
            x: 100,
            y: 200
          },
          'sublocations': [
            {
              'name': 'IDK test',
              'width': 100,
              'height': 100,
              'position': {
                x: 100,
                y: 200
              },
              'sublocations': [
                {
                  'name': 'Recursion',
                  'width': 10,
                  'height': 20,
                  'position': {
                    x: 100,
                    y: 200
                  }
                }
              ]
            }
          ]
        }
      ]
    });
  }
}
