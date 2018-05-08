import {Injectable} from '@angular/core';
import {World} from './model/World';
import {Lamp} from './model/receiver/Lamp';
import {Position} from './model/Position';
import {Avatar} from './model/Avatar';
import {Location} from './model/Location';
import {Speakers} from './model/receiver/Speakers';
import {TV} from './model/receiver/TV';
import {Emitter} from './model/Emitter';
import {Thermometer} from './model/emitters/Thermometer';
import {LightSensor} from './model/emitters/LightSensor';

@Injectable(/*{
  providedIn: WorldsimModule
}*/)
export class WorldsimService {
  private _world: World;

  constructor() {
    this._world = new World();
  }

  loadEnvironment(env: any): void {
    if (env.objects) {
      for (const o of env.objects) {
        switch (o.type) {
          // Receivers
          case 'Lamp':
            this._world.addReceiver(new Lamp(o.name, new Position(o.position.x, o.position.y), o.color, o.intensity));
            break;
          case 'Speakers':
            this._world.addReceiver(new Speakers(o.name, new Position(o.position.x, o.position.y), o.volume));
            break;
          case 'TV':
            this._world.addReceiver(new TV(o.name, new Position(o.position.x, o.position.y), o.channel, o.volume));
            break;
          // Emitters
          case 'Thermometer':
            this._world.addEmmiter(new Thermometer(o.name, new Position(o.position.x, o.position.y), o.temperature));
            break;
          case 'LightSensor':
            this._world.addEmmiter(new LightSensor(o.name, new Position(o.position.x, o.position.y), o.light));
            break;
        }
      }
    }

    if (env.locations) {
      for (const l of env.locations) {
        this._world.addLocation(this.constructLocation(l));
      }
    }

    this._world.addObserver(this.modelChanged);
  }

  public modelChanged(e: any): void {
    // Contact and send data to server about the object.
    if (e instanceof Emitter) {
      console.log('Emitter changed.');
    }
  }

  get world(): World {
    return this._world;
  }

  private constructLocation(sl: any): Location {
    const ps: Avatar[] = [];
    const ls: Location[] = [];

    if (sl.personnages) {
      for (const p of sl.personnages) {
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
