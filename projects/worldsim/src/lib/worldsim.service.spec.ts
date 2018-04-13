import { TestBed, inject } from '@angular/core/testing';

import { WorldsimService } from './worldsim.service';
import {Lamp} from './model/Lamp';
import {Position} from './model/Position';

describe('WorldsimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorldsimService]
    });
  });

  it('should be created', inject([WorldsimService], (service: WorldsimService) => {
    expect(service).toBeTruthy();
  }));

  it('should load the environment correctly', inject([WorldsimService], (service: WorldsimService) => {
    const obj = {
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
        }
      ]
    };

    service.loadEnvironment(obj);

    expect(service.world.receivers.length).toEqual(2);
    expect(service.world.emmiters.length).toEqual(0);
    expect(service.world.locations.length).toEqual(2);
  }));

  it('should construct from recursion correctly', inject([WorldsimService], (service: WorldsimService) => {
    service.loadEnvironment({
      locations: [
        {
          name: 'Root',
          width: 30,
          height: 30,
          position: {
            x: 0,
            y: 0
          },
          sublocations: [
            {
              name: 'Rec 1',
              width: 20,
              height: 20,
              position: {
                x: 0,
                y: 0
              },
              sublocations: [
                {
                  name: 'Rec 2',
                  width: 10,
                  height: 10,
                  position: {
                    x: 0,
                    y: 0
                  }
                }
              ]
            }
          ]
        }
      ]
    });

    expect(service.world.locations.length).toEqual(1);
    expect(service.world.locations[0].name).toEqual('Root');
    expect(service.world.locations[0].sublocations[0].name).toEqual('Rec 1');
    expect(service.world.locations[0].sublocations[0].sublocations[0].name).toEqual('Rec 2');
  }));

  it('should construct objects correctly', inject([WorldsimService], (service: WorldsimService) => {
    service.loadEnvironment({
      objects: [
        {
          type: 'Lamp',
          position: {
            x: 0,
            y: 0
          },
          name: 'Samsung Truc #1',
          state: '#84ff81'
        },
        {
          type: 'Lamp',
          position: {
            x: 10,
            y: 120
          },
          name: 'Philips LMP1',
          state: 'off'
        }
      ]
    });

    expect(service.world.receivers.length).toEqual(2);

    // Test object 1
    expect(service.world.receivers[0].name).toEqual('Samsung Truc #1');
    expect(service.world.receivers[0].position).toEqual(new Position(0, 0));
    expect((<Lamp> service.world.receivers[0]).data.state).toEqual('#84ff81');

    // Test object 2
    expect(service.world.receivers[1].name).toEqual('Philips LMP1');
    expect(service.world.receivers[1].position).toEqual(new Position(10, 120));
    expect((<Lamp> service.world.receivers[1]).data.state).toEqual('off');
  }));
});
