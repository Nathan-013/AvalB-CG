export default class Itachi {
  constructor(scene, width, height) {
    this.scene = scene;
    this.itachi = scene.physics.add.sprite(width, height, 'itachi')
      .setScale(0.5)

    // cria as animações
    scene.anims.create({
      key: 'nda',
      frames: scene.anims.generateFrameNumbers('itachi', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.itachi.play('nda')
  }
}