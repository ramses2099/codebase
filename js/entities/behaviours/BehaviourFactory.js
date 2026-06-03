import { DEBUG } from '../../core/constants.js'
import { SeekBehaviour } from './SeekBehaviour.js'
import { DriftBehaviour } from './DriftBehaviour.js'

export class BehaviourFactory {
  static create (behaviourType) {
    switch (behaviourType) {
      case 'seek':
        return new SeekBehaviour()
      case 'drift':
        return new DriftBehaviour()
      default:
        if (DEBUG) {
          console.log(`[DEV] Unknown behaviour type: ${behaviourType}`)
        }
        return new SeekBehaviour()
    }
  }
}
