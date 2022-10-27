import EndGameScene from './endGameScene.js'
import GameScene from './game.js'
import PreloadScene from './preloadScene.js'

const config = {
  type: Phaser.Auto,
  width: 800,
  height: 600,
  autoCenter: true,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 700 },
        debug: true
    }
  },
  scene : [
    PreloadScene,
    GameScene, 
    EndGameScene
  ]
}

export const game = new Phaser.Game(config)