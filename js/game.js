import endGameScene from './endGameScene.js'
import { game } from './main.js'

var player
var cursors
var princess

var tocha
var tocha2
var fogueira
var fgRomanaL
var fgRomanaR
var bigtorchR
var bigtorchL

var highFall = false

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    });
  }

  preload() {
    this.load.image('bg1', 'assets/backgrounds/bg1.png')
    this.load.image('bg2', 'assets/backgrounds/bg2.png')
    this.load.image('bg3', 'assets/backgrounds/bg3.png')
    this.load.image('bg4', 'assets/backgrounds/bg4.png')
    this.load.image('plat-LG', 'assets/platforms/quad-lg2.png')
    this.load.image('plat-SM', 'assets/platforms/quad-sm.png')
    this.load.image('plat-SM2', 'assets/platforms/quad-sm2.png')
    this.load.image('plat-MD', 'assets/platforms/quad-md.png')
    this.load.image('rect-MD', 'assets/platforms/rect-md.png')
    this.load.image('chao', 'assets/platforms/chao-teste.png');
    this.load.image('fg-romana', 'assets/sprites/romanfirepit.png')
    this.load.image('princess', 'assets/images/princess.png')

    this.load.spritesheet('player', 'assets/sprites/knight-sprite.png', {
      frameWidth: 32, frameHeight: 32
    })
    this.load.spritesheet('fogueira', 'assets/sprites/fogueira.png', {
      frameWidth: 35, frameHeight: 32
    })
    this.load.spritesheet('tocha', 'assets/sprites/tocha.png', {
      frameWidth: 16, frameHeight: 30
    })
    this.load.spritesheet('flames-romana', 'assets/sprites/flames-sprites.png', {
      frameWidth: 11, frameHeight: 20
    })
    this.load.spritesheet('bigtorch', 'assets/sprites/bigtorch.png', {
      frameWidth: 96 / 3, frameHeight: 90
    })
  }

  create() {

    const larguraJogo = this.sys.canvas.width;
    // const alturaJogo = this.sys.canvas.height;

    this.cameras.main.setBounds(0, 0, larguraJogo, 720 * 4);
    this.physics.world.setBounds(0, 0, larguraJogo, 720 * 4);


    this.add.image('0', ' 0', 'bg4').setOrigin(0, 0)
    this.add.image('0', ' 600', 'bg3').setOrigin(0, 0)
    this.add.image('0', ' 1200', 'bg2').setOrigin(0, 0)
    this.add.image('0', ' 1800', 'bg1').setOrigin(0, 0)

    const platform = this.physics.add.staticGroup()

    //platformas iniciais
    platform.create(100, 690 * 4, 'plat-LG')
    platform.create(700, 690 * 4, 'plat-LG')

    //chão com fisica e imagem para dar profundidade
    this.add.image('0', '2790', 'chao').setOrigin(0, 0)
    this.add.image('400', '2785', 'chao').setOrigin(0, 0)
    platform.create(100, 700 * 4, 'chao').setOrigin(0, 0).refreshBody()
    platform.create(400, 700 * 4, 'chao').setOrigin(0, 0).refreshBody()

    //platoformas(quads) menores
    platform.create(120, 598 * 4, 'plat-SM2')
    platform.create(700, 610 * 4, 'plat-SM2')
    platform.create(400, 570 * 4, 'plat-SM2')
    platform.create(720, 550 * 4, 'plat-SM2')
    platform.create(200, 520 * 4, 'plat-SM2')
    platform.create(600, 490 * 4, 'plat-SM2')
    platform.create(200, 460 * 4, 'plat-SM2')
    platform.create(600, 400 * 4, 'plat-SM2')
    platform.create(180, 250 * 4, 'plat-SM').setSize(100, 45).setDisplaySize(100, 45)
    platform.create(620, 250 * 4, 'plat-SM').setSize(100, 45).setDisplaySize(100, 45)
    platform.create(50, 180 * 4, 'plat-SM').setSize(100, 45).setDisplaySize(100, 45)
    platform.create(750, 180 * 4, 'plat-SM').setSize(100, 45).setDisplaySize(100, 45)
    platform.create(40, 230 * 4, 'plat-SM').setSize(100, 45).setDisplaySize(100, 45)
    platform.create(760, 230 * 4, 'plat-SM').setSize(100, 45).setDisplaySize(100, 45)

    platform.create(400, 180 * 4, 'plat-MD')

    //platforms(rect) verticais
    platform.create(170, 320 * 4, 'rect-MD')

    platform.create(220, 300 * 4, 'plat-SM')
    platform.create(220, 350 * 4, 'plat-SM')

    platform.create(120, 110 * 4, 'plat-SM')
    platform.create(680, 110 * 4, 'plat-SM')
    platform.create(400, 70 * 4, 'plat-SM')

    this.anims.create({
      key: 'burn-romana',
      frames: this.anims.generateFrameNumbers('flames-romana', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1
    });

    fgRomanaR = this.add.sprite(770, 168 * 4, 'flames-romana')
    fgRomanaR.setScale(3)
    fgRomanaR.play('burn-romana')
    fgRomanaL = this.add.sprite(30, 168 * 4, 'flames-romana')
    fgRomanaL.setScale(3)
    fgRomanaL.play('burn-romana')

    this.add.image(771, 171 * 4, 'fg-romana').setScale(3)
    this.add.image(29, 171 * 4, 'fg-romana').setScale(3)

    this.anims.create({
      key: 'burn-bigtorch',
      frames: this.anims.generateFrameNumbers('bigtorch', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    bigtorchR = this.add.sprite(740, 64 * 4, 'bigtorch')
    bigtorchR.play('burn-bigtorch')
    bigtorchL = this.add.sprite(80, 63 * 4, 'bigtorch')
    bigtorchL.play('burn-bigtorch')

    player = this.physics.add.sprite(350,  690*4, 'player')
    player.setScale(1.9)
    player.setBounce(0);
    player.setCollideWorldBounds(true);

    princess = this.physics.add.image(350, 45 * 4, 'princess').setScale(0.7).setSize(70, 100)
    this.physics.add.collider(princess, platform)
    this.physics.add.overlap(player, princess, endGame, null, this);

    this.anims.create({
      key: 'burn',
      frames: this.anims.generateFrameNumbers('tocha', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    tocha = this.add.sprite(700, 660 * 4, 'tocha')
    tocha.setScale(2.4)
    tocha.play('burn')

    tocha2 = this.add.sprite(100, 660 * 4, 'tocha')
    tocha2.setScale(2.4)
    tocha2.play('burn')

    this.anims.create({
      key: 'flame',
      frames: this.anims.generateFrameNumbers('fogueira', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    fogueira = this.add.sprite(250, 700 * 4, 'fogueira')
    fogueira.setScale(2.4)
    fogueira.play('flame')

    // const playerPostionX = player.x
    // const playerPostionY = player.y

    this.cameras.main.startFollow(player, true, 0.05, 0.05);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 10 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'player', frame: 0 }],
      frameRate: 20
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'jump-right',
      frames: [{ key: 'player', frame: 5 }],
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'jump-left',
      // frames: this.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
      frames: [{ key: 'player', frame: 12 }],
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'fall-left',
      frames: [{ key: 'player', frame: 11 }],
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'fall-right',
      frames: [{ key: 'player', frame: 6 }],
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'high-fall',
      frames: [{ key: 'player', frame: 7 }],
      frameRate: 10,
    })

    this.physics.add.collider(player, platform)
    // this.physics.add.collider(wizard, platform)

    cursors = this.input.keyboard.createCursorKeys();
  }

  update() {

    const isFalling = player.body.velocity.y > 0
    // const duration =  cursors.up.getDuration() / 1000

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      if (cursors.up.ctrlKey) {
        player.setVelocityY(-650)
        player.anims.play('jump-right')
      } else {
        player.setVelocityY(-580)
        player.anims.play('jump-right')
      }
    }

    if (isFalling) {
      if (cursors.right.isDown) {
        player.anims.play('fall-right')
      }
      if (cursors.left.isDown) {
        player.anims.play('fall-left')
      }
    } else {
      if (!player.body.touching.down && cursors.left.isDown) {
        player.anims.play('jump-left')
      }

      if (!player.body.touching.down && cursors.right.isDown) {
        player.anims.play('jump-right')
      }
    }

    // console.log(player.body.velocity.y)
    if (player.body.velocity.y >= 450) {
      highFall = true
    }

    if (highFall && player.body.onFloor()) {
      player.anims.play('high-fall')
    }

    if (cursors.left.isDown || cursors.right.isDown) {
      highFall = false
    }
  }
}

function endGame() {
  this.scene.start('endGameScene')
}