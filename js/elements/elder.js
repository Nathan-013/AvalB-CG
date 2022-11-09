export default class Elder {
  constructor(scene, width, height) {
    this.scene = scene
    this.elder = scene.add.sprite(width, height, 'elder')
      .setSize(80,300)

    // cria as animações
    scene.anims.create({
      key: 'idl',
      frames: scene.anims.generateFrameNumbers('elder', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.elder.play('idl')
  }
}