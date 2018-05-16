import {Injectable} from '@angular/core';
import {World} from './model/World';
import {Lamp} from './model/objects/Lamp';
import {Position} from './model/Position';
import {Avatar} from './model/Avatar';
import {Speakers} from './model/objects/Speakers';
import {Location} from './model/Location';
import {TV} from './model/objects/TV';
import {Thermometer} from './model/objects/Thermometer';
import {LightSensor} from './model/objects/LightSensor';
import {Obj} from './model/Obj';

import {connect} from 'socket.io-client';

@Injectable(/*{
  providedIn: WorldsimModule
}*/)
export class WorldsimService {
  private _world: World;
  private _socket: SocketIOClient.Socket;

  constructor() {
    this._world = new World();
    this._socket = connect('/simulator');
  }

  loadEnvironment(env: any): void {
    if (env.objects) {
      for (const o of env.objects) {
        switch (o.type) {
          case 'Lamp':
            this._world.addObject(new Lamp(o.name, new Position(o.position.x, o.position.y), o.color, o.intensity));
            break;
          case 'Speakers':
            this._world.addObject(new Speakers(o.name, new Position(o.position.x, o.position.y), o.volume));
            break;
          case 'TV':
            this._world.addObject(new TV(o.name, new Position(o.position.x, o.position.y), o.channel, o.volume));
            break;
          case 'Thermometer':
            this._world.addObject(new Thermometer(o.name, new Position(o.position.x, o.position.y), o.temperature));
            break;
          case 'LightSensor':
            this._world.addObject(new LightSensor(o.name, new Position(o.position.x, o.position.y), o.light));
            break;
        }
      }
    }

    if (env.locations) {
      for (const l of env.locations) {
        this._world.addLocation(this.constructLocation(l));
      }
    }

    if (env.scale && env.scale.x > 0 && env.scale.y > 0) {
      this._world.scale = env.scale;
    }

    this._world.addObserver(this.modelChanged);

    const id: InitialDescription = {
      simulatedEnvironmentName: env.name,
      channels: [],
      emitters: [],
      eventers: []
    };
    this._socket.emit('initialDescription', id);
  }

  public modelChanged(e: any): void {
    // Contact and send data to server about the object.
    if (e instanceof Obj) {
      console.log('Object changed.');
    }
  }

  get world(): World {
    return this._world;
  }

  private constructLocation(sl: any): Location {
    const ps: Avatar[] = [];
    const ls: Location[] = [];

    if (sl.avatars) {
      for (const p of sl.avatars) {
        ps.push(new Avatar(p.name, (p.metadata ? p.metadata : undefined)));
      }
    }

    if (sl.sublocations) {
      for (const l of sl.sublocations) {
        ls.push(this.constructLocation(l));
      }
    }

    return new Location(
      sl.name,
      sl.width,
      sl.height,
      sl.position,
      (sl.metadata ? sl.metadata : undefined),
      ps,
      ls
    );
  }
}

export type InitialDescription = {
  simulatedEnvironmentName: string;
  channels: ChannelOrEmitterInitialDescription[];
  emitters: ChannelOrEmitterInitialDescription[];
  eventers: EventerInitialDescription[];
};

type ChannelOrEmitterInitialDescription = {
  id: string;
  type: string;
  value: any;
};

type EventerInitialDescription = {
  id: string;
  type: string;
};

type Update = {
  id: string;
  value: any;
};
