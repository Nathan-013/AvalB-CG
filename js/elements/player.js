export default class Player {
  constructor(scene, width, height) {
    this.scene = scene
    this.knight = scene.physics.add.sprite(width, height, 'player')
      .setScale(1.9)
      .setBounce(0)
      .setCollideWorldBounds(true)

    // cria as animações
    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers('player', { start: 8, end: 10 }),
      frameRate: 10,
      repeat: -1
    })

    scene.anims.create({
      key: 'turn',
      frames: [{ key: 'player', frame: 0 }],
      frameRate: 20
    })

    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    scene.anims.create({
      key: 'jump-right',
      frames: [{ key: 'player', frame: 5 }],
      frameRate: 10,
      repeat: -1
    })

    scene.anims.create({
      key: 'jump-left',
      frames: [{ key: 'player', frame: 12 }],
      frameRate: 10,
      repeat: -1
    })

    scene.anims.create({
      key: 'fall-left',
      frames: [{ key: 'player', frame: 11 }],
      frameRate: 10,
      repeat: -1
    })

    scene.anims.create({
      key: 'fall-right',
      frames: [{ key: 'player', frame: 6 }],
      frameRate: 10,
      repeat: -1
    })

    scene.anims.create({
      key: 'high-fall',
      frames: [{ key: 'player', frame: 7 }],
      frameRate: 10,
    })
  }
}