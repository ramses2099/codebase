import {
  GAME_WIDTH,
  GAME_HEIGHT,
  ENEMY_DESPAWN_MARGIN
} from '../core/constants.js'
import { enemyData } from '../data/enemyData.js'

export class Enemy {
  constructor (data, behaviour) {
    this.data = data

    // Position and dimensions
    this.x = 0
    this.y = 0
    this.width = this.data.width
    this.height = this.data.height

    // Stats
    this.health = this.data.health
    this.speed = this.data.speed
    this.damage = this.data.damage
    this.collisionRadius = this.data.collisionRadius
    // Behaviour movement
    this.behaviour = behaviour
    this.active = false
  }

  spawn (x, y) {
    this.x = x
    this.y = y
    this.health = this.data.health
    this.active = true
  }

  reset () {
    this.active = false
    this.health = this.data.health
    if(this.behaviour.reset){
      this.behaviour.reset();
    }
  }

  update (dt, player) {
    if (!this.active) return

    //despawn if to far offscreen
    if (
      this.x < -ENEMY_DESPAWN_MARGIN ||
      this.x > GAME_HEIGHT + ENEMY_DESPAWN_MARGIN ||
      this.y < -ENEMY_DESPAWN_MARGIN ||
      this.y > GAME_HEIGHT + ENEMY_DESPAWN_MARGIN
    ) {
      this.active = false
      return
    }

    this.behaviour.update(dt, this, player);
  }
}
