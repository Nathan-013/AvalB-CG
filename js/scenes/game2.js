// import endGameScene from './endGameScene.js'
// import GameScene from './game.js'
// import { game } from './main.js'
import Coin from "../elements/coin.js"
import Itachi from "../elements/itachi.js";
import Player from "../elements/player.js"
import Sharingan from "../elements/sharingan.js";
import Wizard from "../elements/wizard.js";
import { retroMusic } from "./preloadScene.js";

var highFall = false
export const coin = {
  collected: 0
}



export default class GameScene2 extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene2'
    });
  }

  preload() {
  }

  create() {
    //cameras
    this.cameras.main.setBounds(0, 0, 2400, 3200);
    this.physics.world.setBounds(0, 0, 2400, 3200);

    //bg
    this.add.image('0', ' 0', 'bg').setOrigin(0, 0)

    //plataformas,chão e paredes (invisiveis)
    const platform = this.physics.add.staticGroup()
    platform.create(793, 2087, 'invisible').setSize(192, 245)//chão-roxo1
    platform.create(449, 1963, 'invisible').setSize(192, 245)//chão-roxo2
    platform.create(147, 1730, 'invisible').setSize(192, 245)//chão-roxo3
    platform.create(540, 1496, 'invisible').setSize(192, 245)//chão-roxo4
    platform.create(942, 1276, 'invisible').setSize(192, 245)//chão-roxo5
    platform.create(632, 999, 'invisible').setSize(192, 245)//chão-roxo6
    platform.create(216, 630, 'invisible').setSize(192, 245)//chão-roxo7
    platform.create(760, 648, 'invisible').setSize(192, 70)//chão-roxoP1
    platform.create(166, 1030, 'invisible').setSize(192, 70)//chão-roxoP2
    platform.create(350, 2180, 'invisible').setSize(700, 50)//chão-pedra-fase2

    platform.create(2140, 1559, 'invisible').setSize(100, 52)//chão-tijoloP
    platform.create(2363, 1373, 'invisible').setSize(100, 52)//chão-tijoloP
    platform.create(2140, 1190, 'invisible').setSize(100, 52)//chão-tijoloP
    platform.create(2069, 1290, 'invisible').setSize(65, 590)//pilastra
    platform.create(1358, 667, 'invisible').setSize(212, 1400)//paredao

    platform.create(1863, 1745, 'invisible').setSize(156, 52)//chão-tijoloM
    platform.create(2323, 1745, 'invisible').setSize(156, 52)//chão-tijoloM
    platform.create(1595, 1577, 'invisible').setSize(156, 52)//chão-tijoloM
    platform.create(1548, 1257, 'invisible').setSize(156, 52)//chão-tijoloM
    platform.create(1818, 1058, 'invisible').setSize(156, 52)//chão-tijoloM
    platform.create(1623, 844, 'invisible').setSize(156, 52)//chão-tijoloM

    platform.create(1920, 1374, 'invisible').setSize(260, 52)//chão-tijoloG
    platform.create(2170, 660, 'invisible').setSize(460, 52)//chão-tijoloXG
    platform.create(1666, 412, 'invisible').setSize(460, 52)//chão-tijoloXG

    //plat-grama
    platform.create(1000, 3070, 'plat-grama')
    platform.create(1270, 2940, 'plat-grama')
    platform.create(750, 2850, 'plat-grama')
    platform.create(1000, 2660, 'plat-grama')
    platform.create(380, 2600, 'plat-grama')
    platform.create(75, 2630, 'plat-grama')
    platform.create(1300, 2480, 'plat-grama')
    platform.create(750, 2500, 'plat-grama')
    platform.create(1100, 2230, 'plat-grama')
    platform.create(1492, 2190, 'plat-grama')

    //plat-wood
    platform.create(2250, 3083, 'invisible').setSize(160, 35)
    platform.create(1817, 3000, 'invisible').setSize(160, 35)
    platform.create(2187, 2863, 'invisible').setSize(160 * 1.9, 35)
    platform.create(1883, 2687, 'invisible').setSize(160, 35)
    platform.create(2264, 2545, 'invisible').setSize(160, 35)
    platform.create(1935, 2395, 'invisible').setSize(160, 35)
    platform.create(2233, 2245, 'invisible').setSize(310, 35)
    platform.create(1755, 2180, 'invisible').setSize(160, 35)

    //paredes invisiveis
    platform.create(100, 3200, 'invisible').setSize(3000, 35)//chão(fase1)
    platform.create(2090, 1984, 'invisible').setSize(1042, 40)//chão/teto(fase2/extra1)
    platform.create(1580, 3100, 'invisible').setSize(50, 740) //parede1(fase1)
    platform.create(1590, 2270, 'invisible').setSize(43, 530) //parede2(fase1)
    platform.create(1595, 2760, 'invisible').setSize(245, 60) //chao-arvore(fase1)
    platform.create(2000, 3200, 'invisible').setSize(800, 30) //chao-arvore(fase1-extra)

    //music
    this.music = retroMusic

    if (!this.music.isPlaying) {
      this.music.play()
    }

    //player
    this.player = new Player(this, 200, 3100)//3100
    this.cameras.main.startFollow(this.player.knight, true, 0.05, 0.05);
    this.physics.add.collider(this.player.knight, platform)

    //cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    //score
    this.score = 0
    this.sharingan = 0
    this.totalCoin = 4
    this.scoreText = this.add.text(16, 16, `Moedas: 0/4`, {
      fontSize: '32px',
      fill: '#000',
      fontFamily: 'retro',
      stroke: '#ff0',
      strokeThickness: 3,
    })
      .setScrollFactor(0)

    //moedas, itachi, sharingan e pain
    this.coin1 = new Coin(this, 72, 2540)
    this.coin2 = new Coin(this, 170, 920)
    this.coin3 = new Coin(this, 1764, 2120)
    this.eye = new Sharingan(this, 64, 2050)
    this.physics.add.collider(this.coin1.coin, platform)
    this.physics.add.collider(this.coin2.coin, platform)
    this.physics.add.collider(this.coin3.coin, platform)
    this.physics.add.collider(this.eye.sharingan, platform)
    this.physics.add.overlap(this.player.knight, this.coin1.coin, collectCoin, null, this);
    this.physics.add.overlap(this.player.knight, this.coin2.coin, collectCoin, null, this);
    this.physics.add.overlap(this.player.knight, this.coin3.coin, collectCoin, null, this);
    this.physics.add.overlap(this.player.knight, this.eye.sharingan, collectEye, null, this);

    this.itachi = new Itachi(this, 2290, 2700)
    const itachi = this.itachi.itachi
    itachi.setSize(80, 160, 200)
    this.physics.add.collider(itachi, platform)
    this.physics.add.overlap(this.player.knight, itachi, itachiInteraction, null, this);

    this.audioPain = this.sound.add('pain-audio')

    const pain = this.physics.add.image(164, 452, 'pain').setScale(0.27).setSize(140, 370, 400)
    this.physics.add.collider(pain, platform)
    this.physics.add.overlap(this.player.knight, pain, destroyScene, null, this);

    this.wizard = new Wizard(this, 1550, 300)
    this.physics.add.collider(this.wizard.wizard, platform)
    this.physics.add.overlap(this.player.knight, this.wizard.wizard, touchWizard, null, this);
  }

  update() {
    const player = this.player.knight
    const cursors = this.cursors
    const isFalling = player.body.velocity.y > 0
    coin.collected = this.score

    if (cursors.left.isDown) {
      player.setVelocityX(-210);
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(210);
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

    const x = Math.round(this.player.knight.x)
    const y = Math.round(this.player.knight.y)
    // console.log(x, y)
  }
}

let audioFlag = 1
function destroyScene() {
  if (audioFlag) {
    this.music.stop()
    this.audioPain.play()
    audioFlag = 0

    const image = this.add.image(0, 170, 'pain-st').setOrigin(0, 0).setAlpha(0)

    this.tweens.add({
      targets: image,
      alphaTopLeft: { value: 1, duration: 5000, ease: 'Power1' },
      alphaBottomRight: { value: 1, duration: 10000, ease: 'Power1' },
      alphaBottomLeft: { value: 1, duration: 5000, ease: 'Power1', delay: 5000 },
      yoyo: true,
    });
  
    setTimeout(() => {
      document.querySelector('body').innerHTML = `
      <div class="end-game">
        <h1 class="text">FIM DE JOGO</h1>
        <h4 class="text">O Pain destruiu o mapa</h4>
        <p class="text">Pressione F5 ou recarregue a página para jogar novamente</p>
      </div>
      `
    }, 4000)
  }
}

let flagWiz = true
function touchWizard() {
  if (flagWiz) {
    this.music.pause()
    this.add.text(1550, 270, `Venha, vou te levar ao castelo!`, {
      fill: '#000',
      fontFamily: 'retro',
      stroke: '#fff',
      strokeThickness: 3,
    })

    const black = Phaser.Math.Between(0, 0)
    this.cameras.main.on('camerafadeoutstart', function () {
      setTimeout(() => {
        flagItachi = true
        flagWiz = true
        flag = true
        this.scene.start('GameScene')
      }, 2900)
    }, this)

    this.cameras.main.fade(3000, black)

    flagWiz = false
  }
}

let eyeText
function collectEye(player, sharingan) {
  this.sharingan = 1
  sharingan.disableBody(true, true)

  eyeText = this.add.text(16, 60, `Sharingan Coletado`, {
    fontSize: '20px',
    fontStyle: 'bold',
    fill: '#000',
    fontFamily: 'retro',
    stroke: '#f00',
    strokeThickness: 3,
  })
    .setScrollFactor(0)
}

let flag = true
let itachiText = ''
let coinReceivedText = ''
let flagItachi = true
function itachiInteraction() {
  if (flagItachi && !this.sharingan) {
    if (!flag) {
      itachiText = ''
    } else {
      itachiText = `Você é fraco, lhe falta ódio.\nVolte quando tiver meus olhos`
    }

    const text = this.add.text(2000, 2690, itachiText, {
      fontFamily: 'retro',
      color: '#000000',
      stroke: '#ddd',
      strokeThickness: 3,
    })

    setTimeout(() => {
      text.destroy()
    }, 3000)

    flagItachi = false
  }

  if (this.sharingan && flag) {
    itachiText = `Vejo que você ficou mais forte.\nLeve isso, pode ser útil`

    eyeText.setText('')
    if (flag) {
      this.score++
      coinReceivedText = 'VOCÊ RECEBEU UMA MOEDA'
    }

    this.scoreText.setText(`Moedas: ${this.score}/${this.totalCoin}`)

    const text = this.add.text(2000, 2690, itachiText, {
      fontFamily: 'retro',
      color: '#000000',
      stroke: '#ddd',
      strokeThickness: 3,
    })

    const text2 = this.add.text(300, 500, coinReceivedText, {
      fontFamily: 'retro',
      color: '#000000',
      stroke: '#ff0',
      strokeThickness: 3,
    }).setScrollFactor(0)

    setTimeout(() => {
      text.destroy()
      text2.destroy()
    }, 4000)

    flag = false
  }
}

export function collectCoin(player, coin) {
  coin.disableBody(true, true)
  this.score++
  this.scoreText.setText(`Moedas: ${this.score}/${this.totalCoin}`)
}

