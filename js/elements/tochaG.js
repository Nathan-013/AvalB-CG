export default class TochaG {
  constructor(scene, width, height) {
    this.scene = scene;
    this.tochaG = scene.add.sprite(width, height, 'bigtorch')

    // cria as animações
    scene.anims.create({
      key: 'burn-bigtorch',
      frames: scene.anims.generateFrameNumbers('bigtorch', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    this.tochaG.play('burn-bigtorch')
  }
}