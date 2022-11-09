export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'LoadingScene'
    });
  }

  preload() {
    const larguraJogo = this.sys.canvas.width;
    const barraDeProgresso = this.add.graphics();

    // registra evento de progresso para atualizar a barra de progresso
    const larguraBarra = 0.8 * larguraJogo;
    this.load.on('progress', (value) => {
      barraDeProgresso.clear();

      // barra branca preenchida
      barraDeProgresso.fillStyle(0xff0000, 1);
      barraDeProgresso.fillRect((larguraJogo - larguraBarra) / 2, this.sys.game.config.height / 2, larguraBarra * value, 20);

      // contorno amarelo
      barraDeProgresso.lineStyle(4, 0xffff00, 1);
      barraDeProgresso.strokeRect((larguraJogo - larguraBarra) / 2, this.sys.game.config.height / 2, larguraBarra, 20);
    });

    
    //AUDIO
    this.load.audio('pain-audio', 'assets/audio/Shinra-Tensei.mp3')
    this.load.audio('music-intro', 'assets/audio/Retro_Music.mp3')
    
    this.load.on('complete', () => {
      this.scene.start('PreloadScene')
      // this.scene.start('GameScene2')
    });

    //IMAGEM
    this.load.image('tela-inicial', 'assets/images/tela-inicial.png')
    this.load.image('tela-inicial2', 'assets/images/tela-inicial2.png')
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
    this.load.image('pain-st', 'assets/images/pain-st.png')
    this.load.image('bg', 'assets/backgrounds/bg-phase2.png')
    this.load.image('princess', 'assets/images/princess.png')
    this.load.image('invisible', 'assets/platforms/invisible.png')
    this.load.image('plat-grama', 'assets/platforms/plat-grama.png')
    this.load.image('pain', 'assets/images/pain.png')
    this.load.image('extra', 'assets/images/extra.png')

    //SPRITES
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
    this.load.spritesheet('wizard', 'assets/sprites/wizard.png', {
      frameWidth: 1386 / 6, frameHeight: 190
    })
    this.load.spritesheet('elder', 'assets/sprites/elder.png', {
      frameWidth: 128 / 4, frameHeight: 32
    })
    this.load.spritesheet('coin', 'assets/sprites/coin.png', {
      frameWidth: 105, frameHeight: 100
    })
    this.load.spritesheet('itachi', 'assets/sprites/itachiL.png', {
      frameWidth: 1600/8, frameHeight: 335
    })
    this.load.spritesheet('sharingan', 'assets/sprites/sharingan.png', {
      frameWidth: 5680/16, frameHeight: 355
    })
  }
}