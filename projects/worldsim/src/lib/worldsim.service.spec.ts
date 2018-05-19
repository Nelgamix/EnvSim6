import { TestBed, inject } from '@angular/core/testing';

import { WorldsimService } from './worldsim.service';
import {Lamp} from './model/objects/Lamp';
import {Position} from './model/Position';
import {JSONWorld} from './model/types';
import {LightSensor} from './model/objects/LightSensor';
import {TV} from './model/objects/TV';
import {Thermometer} from './model/objects/Thermometer';
import {Speakers} from './model/objects/Speakers';

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
    expect(service.loadEnvironment(envEmpty)).toBeTruthy();

    expect(service.world.objects.length).toEqual(0);
    expect(service.world.locations.length).toEqual(0);
  }));

  it('should construct locations correctly', inject([WorldsimService], (service: WorldsimService) => {
    expect(service.loadEnvironment(envOneLocation)).toBeTruthy();

    expect(service.world.locations.length).toEqual(1);
    expect(service.world.locations[0].name).toEqual('Location 1');
    expect(service.world.locations[0].sublocations.length).toEqual(0);
  }));

  it('should construct from recursion correctly', inject([WorldsimService], (service: WorldsimService) => {
    expect(service.loadEnvironment(envRecursiveOneLocation)).toBeTruthy();

    expect(service.world.locations.length).toEqual(1);
    expect(service.world.locations[0].name).toEqual('Location 1: Root');
    expect(service.world.locations[0].sublocations.length).toEqual(1);
    expect(service.world.locations[0].sublocations[0].name).toEqual('Location 1: Child');
  }));

  it('should construct objects correctly', inject([WorldsimService], (service: WorldsimService) => {
    expect(service.loadEnvironment(envObjects)).toBeTruthy();

    expect(service.world.objects.length).toEqual(5);

    // Test object 1
    expect(service.world.objects[0].name).toEqual('Object 1: Lamp');
    expect(service.world.objects[0].position).toEqual(new Position(10, 10));
    expect((<Lamp> service.world.objects[0]).color).toEqual('#fff');
    expect((<Lamp> service.world.objects[0]).intensity).toEqual(.5);

    // Test object 2
    expect(service.world.objects[1].name).toEqual('Object 2: LightSensor');
    expect(service.world.objects[1].position).toEqual(new Position(20, 20));
    expect((<LightSensor> service.world.objects[1]).light).toEqual(.6);

    // Test object 3
    expect(service.world.objects[2].name).toEqual('Object 3: Speakers');
    expect(service.world.objects[2].position).toEqual(new Position(30, 30));
    expect((<Speakers> service.world.objects[2]).volume).toEqual(.7);

    // Test object 4
    expect(service.world.objects[3].name).toEqual('Object 4: Thermometer');
    expect(service.world.objects[3].position).toEqual(new Position(40, 40));
    expect((<Thermometer> service.world.objects[3]).temperature).toEqual(21);

    // Test object 5
    expect(service.world.objects[4].name).toEqual('Object 5: TV');
    expect(service.world.objects[4].position).toEqual(new Position(50, 50));
    expect((<TV> service.world.objects[4]).channel).toEqual(2);
    expect((<TV> service.world.objects[4]).volume).toEqual(.8);
  }));

  it('should load scaled environment correctly', inject([WorldsimService], (service: WorldsimService) => {
    expect(service.loadEnvironment(envScaled)).toBeTruthy();

    expect(service.world.scale).toEqual({x: 2, y: 2});
  }));
});

const envEmpty: JSONWorld = {
  name: 'Empty environment',
  objects: [],
  locations: []
};

const envOneLocation: JSONWorld = {
  name: 'One location environment',
  objects: [],
  locations: [
    {
      name: 'Location 1',
      position: {
        x: 0,
        y: 0
      },
      width: 10,
      height: 10
    }
  ]
};

const envRecursiveOneLocation: JSONWorld = {
  name: 'One location recursive environment',
  objects: [],
  locations: [
    {
      name: 'Location 1: Root',
      position: {
        x: 0,
        y: 0
      },
      width: 10,
      height: 10,
      sublocations: [
        {
          name: 'Location 1: Child',
          position: {
            x: 0,
            y: 0
          },
          width: 10,
          height: 10
        }
      ]
    }
  ]
};

const envScaled: JSONWorld = {
  name: 'Scaled environment',
  objects: [],
  locations: [
    {
      name: 'Location 1',
      position: {
        x: 0,
        y: 0
      },
      width: 10,
      height: 10
    }
  ],
  scale: {
    x: 2,
    y: 2
  }
};

const envObjects: JSONWorld = {
  name: 'Object environment',
  objects: [
    {
      name: 'Object 1: Lamp',
      position: {
        x: 10,
        y: 10
      },
      type: 'Lamp',
      color: '#fff',
      intensity: .5
    },
    {
      name: 'Object 2: LightSensor',
      position: {
        x: 20,
        y: 20
      },
      type: 'LightSensor',
      light: .6
    },
    {
      name: 'Object 3: Speakers',
      position: {
        x: 30,
        y: 30
      },
      type: 'Speakers',
      volume: .7
    },
    {
      name: 'Object 4: Thermometer',
      position: {
        x: 40,
        y: 40
      },
      type: 'Thermometer',
      temperature: 21
    },
    {
      name: 'Object 5: TV',
      position: {
        x: 50,
        y: 50
      },
      type: 'TV',
      channel: 2,
      volume: .8
    }
  ],
  locations: [
    {
      name: 'Location 1',
      position: {
        x: 0,
        y: 0
      },
      width: 50,
      height: 50
    }
  ]
};
