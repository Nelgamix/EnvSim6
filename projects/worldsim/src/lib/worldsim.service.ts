import { Injectable } from '@angular/core';
import { WorldsimModule } from './worldsim.module';
import {World} from './model/World';
import {Lamp} from './model/Lamp';
import {Position} from './model/Position';

@Injectable(/*{
  providedIn: WorldsimModule
}*/)
export class WorldsimService {
  private _world: World;

  constructor() {
    this._world = new World();
  }

  loadEnvironment(env: any): void {
    for (const o of env.objects) {
      switch (o.type) {
        case 'Lamp':
          this._world.addObject(new Lamp(o.name, new Position(o.position.x, o.position.y), o.state));
          break;
      }
    }
  }

  get world(): World {
    return this._world;
  }
}
