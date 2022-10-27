export default class endGameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'endGameScene'
    });
  }

  preload() {
    this.load.image('thanks', 'assets/images/end.png')
  }

  create() {
    this.add.image('0', ' 0', 'thanks').setOrigin(0, 0)
    this.input.on('pointerdown', () => {
      this.scene.start('GameScene')
    });
  }

  update() {

  }
}