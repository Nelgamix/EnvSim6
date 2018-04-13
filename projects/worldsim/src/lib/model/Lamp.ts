import {Position} from './Position';
import {Receiver} from './Receiver';

export class Lamp extends Receiver {
  constructor(name: string, position: Position, state: any) {
    super(name, position, {state: state});
  }
}
