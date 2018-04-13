import { Injectable } from '@angular/core';
import { WorldsimModule } from './worldsim.module';
import {World} from './model/World';
import {Lamp} from './model/Lamp';
import {Position} from './model/Position';
import {Personnage} from './model/Personnage';
import {Location} from './model/Location';

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
          case 'Lamp':
            this._world.addReceiver(new Lamp(o.name, new Position(o.position.x, o.position.y), o.state));
            break;
        }
      }
    }

    if (env.locations) {
      for (const l of env.locations) {
        this._world.addLocation(this.constructLocation(l));
      }
    }
  }

  get world(): World {
    return this._world;
  }

  private constructLocation(sl: any): Location {
    const ps: Personnage[] = [];
    const ls: Location[] = [];

    if (sl.personnages) {
      for (const p of sl.personnages) {
        ps.push(new Personnage(p.name, (p.metadata ? p.metadata : undefined)));
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
