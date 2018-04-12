import { TestBed, inject } from '@angular/core/testing';

import { WorldsimService } from './worldsim.service';

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
        }
      ],
      'locations': [
      ]
    };

    service.loadEnvironment(obj);
    expect(service.world.objects.length).toEqual(1);
  }));
});
