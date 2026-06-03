export class SeekBehaviour {
  update (dt, enemy, player) {
    // calculate direction to player
    const dx = player.x + player.width / 2 - enemy.x + enemy.width / 2
    const dy = player.y + player.height / 2 - enemy.y + enemy.height / 2
    const len = Math.sqrt(dx * dx + dy * dy)

    if (len > 0) {
      const normDx = dx / len
      const normDy = dy / len

      enemy.x += normDx * enemy.speed * dt
      enemy.y += normDy * enemy.speed * dt
    }
  }
}
