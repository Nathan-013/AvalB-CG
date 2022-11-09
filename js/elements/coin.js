export default class Coin {
  constructor(scene, width, height) {
    this.scene = scene;
    this.coin = scene.physics.add.sprite(width, height, 'coin')
      .setScale(0.8)

    // cria as animações
    scene.anims.create({
      key: 'rotate',
      frames: scene.anims.generateFrameNumbers('coin', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1
    });

    this.coin.play('rotate')
  }
}