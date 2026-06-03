export class DriftBehaviour {
  constructor () {
    this.angle = Math.random() * Math.PI * 2
    this.changeTime = 0
    this.changeInterval = 2
  }

  update (dt, enemy, player) {
    this.changeTime += dt

    if (this.changeTime >= this.changeInterval) {
      this.angle = Math.random() * Math.PI * 2
      this.changeTime = 0
    }

    const dx = Math.cos(this.angle)
    const dy = Math.sin(this.angle)

    enemy.x += dx * enemy.speed * dt
    enemy.y += dy * enemy.speed * dt
  }

  reset () {
    this.angle = Math.random() * Math.PI * 2
    this.changeTime = 0
  }
}
