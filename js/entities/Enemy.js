import { GAME_WIDTH, GAME_HEIGHT } from '../core/constants.js'
import { enemyData } from '../data/enemyData.js'

export class Enemy {
  constructor (data) {
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
  }

  spawn (x, y) {
    this.x = x
    this.y = y
    this.health = this.data.health
    
  }

  update (dt) {}
}
