export let retroMusic

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'PreloadScene'
    });
  }

  preload() {
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

    this.music = this.sound.add('music-intro')
    retroMusic = this.music
    this.music.play({
      loop:true
    })

    this.input.on('pointerdown', () => {
      // this.music.stop()
      this.scene.start('GameScene2')
    });
  }
}
