import { Enemy } from '../entities/Enemy.js'
import { enemyData } from '../data/enemyData.js'
import { ObjectPooler } from '../utils/ObjectPooler.js'
import { BehaviourFactory } from '../entities/behaviours/BehaviourFactory.js'

export class EnemyManager {
  constructor () {
    const ENEMY_POOL_SIZE = 10

    this.pool = new ObjectPooler(() => {
      const data = enemyData.drifter
      const behaviour = BehaviourFactory.create(data.behaviourType)
      return new Enemy(data, behaviour)
    }, ENEMY_POOL_SIZE)
  }

  spawn (x, y) {
    const enemy = this.pool.get()
    enemy.spawn(x, y)
    return enemy
  }

  getActiveEnemies () {
    return this.pool.active
  }

  update (dt, player) {
    this.pool.updateAll(dt, player)
  }

  reset () {
    this.pool.releaseAll()
  }
}
