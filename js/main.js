import EndGameScene from './scenes/endGameScene.js'
import GameScene from './scenes/game.js'
import PreloadScene from './scenes/preloadScene.js'
import GameScene2 from './scenes/game2.js'
import LoadingScene from './scenes/loadingScene.js'
import ExtraScene from './scenes/extraScene.js'

const config = {
  type: Phaser.Auto,
  width: 800,
  height: 600,
  autoCenter: true,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 700 },
        debug: false
    }
  },
  scene : [
    LoadingScene,
    PreloadScene,
    GameScene2, 
    GameScene,
    ExtraScene,
    EndGameScene
  ]
}

export const game = new Phaser.Game(config)