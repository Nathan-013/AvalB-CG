export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
        key: 'PreloadScene'
    });
  }

  preload() {
   this.load.image('tela-inicial', 'assets/images/tela-inicial.png')
   this.load.image('tela-inicial2', 'assets/images/tela-inicial2.png')
  }

  create() {
    this.anims.create({
      key: 'blink-text',
      frames: [
          { key: 'tela-inicial' },
          { key: 'tela-inicial2', duration: 100 }
      ],
      frameRate: 4,
      repeat: -1
  });

    this.add.sprite('0', '0', 'tela-inicial').setOrigin(0,0)
      .play('blink-text')
    this.input.on('pointerdown', () => {
      this.scene.start('GameScene')
    });
  }

  update() {

  }
}