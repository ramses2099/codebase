import {
  GAME_WIDTH,
  GAME_HEIGHT,
  ASPECT_RATIO,
  CANVAS_MARGIN,
  GAME_STATES
} from './constants.js'
import { RenderSystem } from '../systems/RenderSystem.js'
import { Player } from '../entities/Player.js'
import { ImageManager } from '../managers/ImageManager.js'
import { AudioManager } from '../managers/AudioManager.js'
import { UIManager } from '../managers/UIManager.js'
import { EnemyManager } from '../managers/EnemyManager.js'

export class Game {
  constructor () {
    //canvas element
    /** @type {HTMLCanvasElement} */
    this.canvas = document.getElementById('gameCanvas')

    // state
    this.state = GAME_STATES.MENU

    this.imageManager = new ImageManager()
    this.audioManager = new AudioManager()
    this.uiManager = new UIManager(this)
    this.enemyManager = new EnemyManager()

    this.player = new Player()
    this.keys = {}
    this.lastTime = 0
    this.time = 0

    this.renderSystem = new RenderSystem(this.canvas, this.imageManager)

    this.init()
  }

  setupInput () {
    window.addEventListener('keydown', e => {
      this.keys[e.key.toLowerCase()] = true

      // Esc toggles pause
      if (e.key === 'Escape') {
        if (this.state === GAME_STATES.PLAYING) {
          this.pause()
        } else if (this.state === GAME_STATES.PAUSED) {
          this.resume()
        }
      }
    })

    window.addEventListener('keyup', e => {
      this.keys[e.key.toLowerCase()] = false
    })

    window.addEventListener('contextmenu', e => {
      this.keys = {}
    })

    window.addEventListener('blur', e => {
      this.keys = {}
    })
  }

  startGame () {
    this.playSound('button_click')
    this.state = GAME_STATES.PLAYING
    this.uiManager.hideAllPanels()
    this.uiManager.showTimer()

    // Reset player position
    this.player.reset()
    this.enemyManager.spawn(25, 50)

    this.lastTime = performance.now()
  }

  pause () {
    this.state = GAME_STATES.PAUSED
    this.playSound('pause')
    this.uiManager.showPanel('pauseMenu')
  }

  resume () {
    this.state = GAME_STATES.PLAYING
    this.playSound('unpause')
    this.uiManager.hideAllPanels()
  }

  returnToMenu () {
    this.playSound('button_click')
    this.state = GAME_STATES.MENU
    this.uiManager.hideAllPanels()
    this.uiManager.hideTimer()
    this.uiManager.showPanel('mainMenu')
  }

  playSound (name) {
    this.audioManager.play(name)
  }

  async init () {
    await Promise.all([
      this.imageManager.loadAll(),
      this.audioManager.loadAll()
    ])

    this.uiManager.showPanel('mainMenu')

    this.resizeCanvas()
    window.addEventListener('resize', () => this.resizeCanvas())
    // setup input
    this.setupInput()

    this.lastTime = performance.now()
    // start game loop
    requestAnimationFrame(t => this.gameLoop(t))
  }

  resizeCanvas () {
    let w, h

    const availableWidth = window.innerWidth - CANVAS_MARGIN * 2
    const availableHeight = window.innerHeight - CANVAS_MARGIN * 2

    if (availableWidth / availableHeight > ASPECT_RATIO) {
      h = availableHeight
      w = Math.floor(h * ASPECT_RATIO)
    } else {
      w = availableWidth
      h = Math.floor(w / ASPECT_RATIO)
    }

    this.canvas.with = GAME_WIDTH
    this.canvas.height = GAME_HEIGHT

    this.canvas.style.width = `${w}px`
    this.canvas.style.height = `${h}px`
    this.canvas.style.margin = `${CANVAS_MARGIN}px`
  }

  update (dt) {
    if (this.state !== GAME_STATES.PLAYING) return
    this.player.update(dt, this.keys)
  }

  gameLoop (timestamp) {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1)
    this.lastTime = timestamp

    if (this.state == GAME_STATES.PLAYING) {
      this.time += dt
      this.uiManager.updateTimer(this.time)
    }

    // systems
    this.update(dt)
    // render
    const enemies = this.enemyManager.getActiveEnemies()
    this.renderSystem.render(this.state, this.player, enemies)

    requestAnimationFrame(t => this.gameLoop(t))
  }
}
