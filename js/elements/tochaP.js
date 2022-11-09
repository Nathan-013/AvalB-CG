export default class TochaP {
  constructor(scene, width, height) {
    this.scene = scene;
    this.tochaP = scene.add.sprite(width, height, 'tocha')
      .setScale(2.4)

    // cria as animações
    scene.anims.create({
      key: 'burn',
      frames: scene.anims.generateFrameNumbers('tocha', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.tochaP.play('burn')
  }
}