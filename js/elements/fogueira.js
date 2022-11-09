export default class Fogueira {
  constructor(scene, width, height) {
    this.scene = scene;
    this.fogueira = scene.add.sprite(width, height, 'fogueira')
      .setScale(2.4)

    // cria as animações
    scene.anims.create({
      key: 'flame',
      frames: scene.anims.generateFrameNumbers('fogueira', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });

    this.fogueira.play('flame')
  }
}