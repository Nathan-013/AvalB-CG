export default class Sharingan {
  constructor(scene, width, height) {
    this.scene = scene
    this.sharingan = scene.physics.add.sprite(width, height, 'sharingan')
      .setScale(0.2)

    // cria as animações
    scene.anims.create({
      key: 'mangekeyo',
      frames: scene.anims.generateFrameNumbers('sharingan', { start: 0, end: 15 }),
      frameRate: 10,
      repeat: -1
    });

    this.sharingan.play('mangekeyo')
  }
}