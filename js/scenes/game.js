// import endGameScene from './endGameScene.js'
// import { game } from './main.js'
import Fogueira from '../elements/fogueira.js'
import TochaP from '../elements/tochaP.js'
import TochaG from '../elements/tochaG.js'
import Player from '../elements/player.js'
import Coin from '../elements/coin.js'
import Wizard from '../elements/wizard.js'
import { collectCoin, coin } from './game2.js'

var highFall = false

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    });
  }

  preload() {
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

    //FOGUEIRA ROMANA (DIREITA-ESQUERDA)
    this.anims.create({
      key: 'burn-romana',
      frames: this.anims.generateFrameNumbers('flames-romana', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1
    });

    this.fgRomanaR = this.add.sprite(770, 168 * 4, 'flames-romana')
      .setScale(3)
      .play('burn-romana')

    this.fgRomanaL = this.add.sprite(30, 168 * 4, 'flames-romana')
      .setScale(3)
      .play('burn-romana')

    this.add.image(771, 171 * 4, 'fg-romana').setScale(3)
    this.add.image(29, 171 * 4, 'fg-romana').setScale(3)

    //TOCHA GRANDE
    this.bigtorchR = new TochaG(this, 740, 64*4)
    this.bigtorchL = new TochaG(this, 80, 63*4)

    //JOGADOR
    this.player = new Player(this, 350,  690*4) //690 - 100
    this.cameras.main.startFollow(this.player.knight, true, 0.05, 0.05);
    this.physics.add.collider(this.player.knight, platform)

    //WIZARD
    this.wizard = new Wizard(this, 590, 685*4)
    this.wizard.wizard.flipX = true
    this.physics.add.collider(this.wizard.wizard, platform)
    const wizardText = this.add.text(358, 664*4, 
      `A princesa que você procura\ndeve estar no topo!`, {
      fill: '#000',
      fontFamily: 'retro',
      stroke: '#fff',
      strokeThickness: 3,
    })

    setTimeout(() => {
      wizardText.setText('')
    }, 3000)

    //PRINCESA
    this.princess = this.physics.add.image(350, 45 * 4, 'princess').setScale(0.7).setSize(70, 100)
    this.physics.add.collider(this.princess, platform)
    this.physics.add.overlap(this.player.knight, this.princess, endGame, null, this);

    //TOCHA PEQUENA(INICIO FASE)
    this.tocha1 = new TochaP(this, 700, 660 * 4)
    this.tocha2 = new TochaP(this, 100, 660 * 4)

    //FOGUEIRA
    this.fogueira = new Fogueira(this, 250, 700 * 4)

    //CURSOR
    this.cursors = this.input.keyboard.createCursorKeys();

    //score
    this.score = 0
    this.totalCoin = 1
    this.scoreText = this.add.text(16, 16, `Moedas: ${this.score}/${this.totalCoin}`, {
      fontSize: '32px',
      fill: '#000',
      fontFamily: 'retro',
      stroke: '#ff0',
      strokeThickness: 3,
    }).setScrollFactor(0)

    this.coin = new Coin(this, 760, 700)
    this.physics.add.collider(this.coin.coin, platform)
    this.physics.add.overlap(this.player.knight, this.coin.coin, collectCoin, null, this);
  }

  update() {
    const player = this.player.knight
    const cursors = this.cursors
    const isFalling = player.body.velocity.y > 0

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

    if (player.body.velocity.y >= 650) {
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

//FUNÇÕES
function loadFont(name, url) {
  var newFont = new FontFace(name, `url(${url})`);
  newFont.load().then(function (loaded) {
      document.fonts.add(loaded);
  }).catch(function (error) {
      return error;
  });
}
loadFont('retro', 'assets/fonts/Retro-Gaming.ttf')

let flag1 = true
function endGame() {
  if (flag1) {
    const princessText = `Ainda bem que alguém chegou!\nVocê conhece o Mario? rs`
    
    this.add.text(350, 30 * 4, princessText, { 
      fontFamily: 'retro', 
      fill: '#000000',
      stroke: '#fff',
      strokeThickness: 3, 
    })

    const black = Phaser.Math.Between(0,0)
  
    this.cameras.main.on('camerafadeoutstart', function() {
      setTimeout(() => {
          flag1 = true
          if (coin.collected + this.score === 5){//5
            this.scene.start('extraScene')
          } else {
            this.scene.start('endGameScene')
          }
        }, 4900)
    }, this)
  
    this.cameras.main.fade(5000, black)
    
    flag1 = false
  }
}