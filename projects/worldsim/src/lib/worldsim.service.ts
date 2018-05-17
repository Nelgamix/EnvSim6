import {Injectable} from '@angular/core';
import {JSONWorld, World} from './model/World';
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
import {InitialDescription, Update, UpdateType} from './model/types';

/**
 * Entry point service for worldsim lib.
 */
@Injectable(/*{
  providedIn: WorldsimModule
}*/)
export class WorldsimService {
  /**
   * Namespace chosen in the server.
   * @type {string}
   */
  private static readonly NAMESPACE = 'simulator';

  /**
   * Name of
   * @type {string}
   */
  private static readonly EVENT_UPDATE_EMITTER = 'updateEmitter';
  private static readonly EVENT_UPDATE_CHANNEL = 'updateChannel';
  private static readonly EVENT_UPDATE_EVENTER = 'triggerEvent';
  private static readonly EVENT_INITIALDESCRIPTION = 'initialDescription';

  private _world: World;
  private _socket: SocketIOClient.Socket;

  constructor() {
    this._world = new World();
    this._socket = connect('/' + WorldsimService.NAMESPACE);
    this._socket.on(WorldsimService.EVENT_UPDATE_CHANNEL, (u: Update) => this.receivedUpdate(u));
  }

  loadEnvironment(env: JSONWorld): void {
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

    this._world.addObserver(this.sendUpdate.bind(this));

    const id: InitialDescription = {
      simulatedEnvironmentName: env.name,
      channels: [],
      emitters: [],
      eventers: []
    };

    this._world.objects.forEach(o => o.register(id));

    console.log(id);

    this._socket.emit(WorldsimService.EVENT_INITIALDESCRIPTION, id);
  }

  public sendUpdate(u: Update, t: UpdateType): void {
    switch (t) {
      case UpdateType.EMITTER:
        this._socket.emit(WorldsimService.EVENT_UPDATE_EMITTER, u);
        break;
      case UpdateType.CHANNEL:
        this._socket.emit(WorldsimService.EVENT_UPDATE_CHANNEL, u);
        break;
      case UpdateType.EVENT:
        this._socket.emit(WorldsimService.EVENT_UPDATE_EVENTER, u);
        break;
      default:
        console.error('Update type incorrect');
        return;
    }

    console.log('Sent update.');
  }

  private receivedUpdate(u: Update) {
    const objName = Obj.getObjName(u.id);
    const o: Obj = this._world.objects.find(p => p.name === objName);
    if (!o.update(u)) {
      console.error('Could not find the right object to update!');
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
