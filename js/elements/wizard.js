export default class Wizard {
  constructor(scene, width, height) {
    this.scene = scene
    this.wizard = scene.physics.add.sprite(width, height, 'wizard')
      .setScale(1.2)
      .setSize(50, 80, 290)

    // cria as animações
    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('wizard', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.wizard.play('idle')
  }
}