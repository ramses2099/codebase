import { DEBUG } from '../../core/constants.js'
import { SeekBehaviour } from './SeekBehaviour.js'

export class BehaviourFactory {
  static create (behaviourType) {
    switch (behaviourType) {
      case 'seek':
        return new SeekBehaviour()

      default:
        if (DEBUG) {
          console.log(`[DEV] Unknown behaviour type: ${behaviourType}`);
        }
        return new SeekBehaviour()
    }
  }
}
