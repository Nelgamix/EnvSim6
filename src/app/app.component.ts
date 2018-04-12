import { Component } from '@angular/core';
import {WorldsimService} from '../../projects/worldsim/src/lib/worldsim.service';

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
        }
      ],
      'locations': [
      ]
    });
  }
}
