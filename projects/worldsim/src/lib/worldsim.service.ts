import {Injectable} from '@angular/core';
import {World} from './model/World';
import {Lamp} from './model/objects/Lamp';
import {Avatar} from './model/Avatar';
import {Speakers} from './model/objects/Speakers';
import {Location} from './model/Location';
import {TV} from './model/objects/TV';
import {Thermometer} from './model/objects/Thermometer';
import {LightSensor} from './model/objects/LightSensor';
import {Obj} from './model/Obj';

import {connect} from 'socket.io-client';
import {InitialDescription, JSONWorld, Update, UpdateType} from './model/types';

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
   * Name of the communication channels, must be the same as those used in the server
   * @type {string}
   */
  private static readonly EVENT_UPDATE_EMITTER = 'updateEmitter';
  private static readonly EVENT_UPDATE_CHANNEL = 'updateChannel';
  private static readonly EVENT_UPDATE_EVENTER = 'triggerEvent';
  private static readonly EVENT_INITIALDESCRIPTION = 'initialDescription';

  /**
   * World object
   */
  private _world: World;

  /**
   * Socket communicating with the remote (or local) server.
   */
  private _socket: SocketIOClient.Socket;

  /**
   * Boolean indicating if we are connected to the server.
   * @type {boolean}
   * @private
   */
  private _isConnected = false;

  private _initialDescription: InitialDescription;

  constructor() {
    this._world = new World();
    this._socket = connect('/' + WorldsimService.NAMESPACE);

    // Setup listeners on the socket
    this._socket.on('connected', () => {
      this._isConnected = true;

      // Send initial description if we did not send it already.
      if (this._initialDescription) {
        this.sendInitialDescription();
      }
    });
    this._socket.on('disconnected', () => this._isConnected = false);
    this._socket.on(WorldsimService.EVENT_UPDATE_CHANNEL, (u: Update) => this.receivedUpdate(u));
  }

  /**
   * Load the environment contained in env.
   * @param {JSONWorld} env the environment.
   */
  public loadEnvironment(env: JSONWorld): boolean {
    if (!env.name) {
      return false;
    }

    // Init objects
    for (const o of env.objects) {
      let no: Obj;
      switch (o.type) {
        case 'Lamp':
          no = Lamp.constructFrom(o);
          break;
        case 'Speakers':
          no = Speakers.constructFrom(o);
          break;
        case 'TV':
          no = TV.constructFrom(o);
          break;
        case 'Thermometer':
          no = Thermometer.constructFrom(o);
          break;
        case 'LightSensor':
          no = LightSensor.constructFrom(o);
          break;
      }

      if (no !== null) {
        this._world.addObject(no);
      } else {
        this.cleanEnvironment();
        return false;
      }
    }

    // Init locations
    for (const l of env.locations) {
      this._world.addLocation(this.constructLocation(l));
    }

    // Search for a valid scale
    if (env.scale) {
      if (env.scale.x > 0 && env.scale.y > 0) {
        this._world.scale = env.scale;
      } else {
        this.cleanEnvironment();
        return false;
      }
    }

    this._world.addObserver(this.sendUpdate.bind(this));

    const id: InitialDescription = {
      simulatedEnvironmentName: env.name,
      channels: [],
      emitters: [],
      eventers: []
    };

    this._world.objects.forEach(o => o.register(id));
    this._world.avatars.forEach(o => o.register(id));

    console.log(id);

    this._initialDescription = id;

    if (this._isConnected) {
      this.sendInitialDescription();
    }

    return true;
  }

  private cleanEnvironment(): void {
    this._world.clean();
  }

  /**
   * Send an update to the server if we are connected.
   * @param {Update} u the update to send.
   * @param {UpdateType} t the type of the update to send.
   */
  private sendUpdate(u: Update, t: UpdateType): void {
    if (!this._isConnected) {
      console.log('Not connected.');
      return;
    }

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

  /**
   * Send the initial description of the environment to the server if we can.
   */
  private sendInitialDescription(): void {
    if (this._isConnected && this._initialDescription) {
      this._socket.emit(WorldsimService.EVENT_INITIALDESCRIPTION, this._initialDescription);
    }
  }

  /**
   * Construct a location, recursively, with its sublocations.
   * @param sl the description of the location
   * @returns {Location} the constructed location object.
   */
  private constructLocation(sl: any): Location {
    const ps: Avatar[] = [];
    const ls: Location[] = [];

    if (sl.avatars) {
      for (const p of sl.avatars) {
        ps.push(new Avatar(p.name, sl.name, (p.metadata ? p.metadata : undefined)));
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

  get world(): World {
    return this._world;
  }

  get isConnected(): boolean {
    return this._isConnected;
  }
}
