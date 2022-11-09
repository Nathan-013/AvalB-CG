export default class ExtraScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'extraScene'
    });
  }

  preload() {
  }

  create() {
    this.add.image('0', '0', 'extra').setOrigin(0, 0)
    // this.input.on('pointerdown', () => {
    //   this.scene.start('endGameScene')
    // });

    const black = Phaser.Math.Between(0, 0)
    this.cameras.main.on('camerafadeoutstart', function () {
      setTimeout(() => {
        this.scene.start('endGameScene')
      }, 1900)
    }, this)

    this.cameras.main.fade(2000, black)
  }
}