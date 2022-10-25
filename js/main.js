const config = {
  type: Phaser.Auto,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 100 },
        debug: true
    }
  },
  scene : {
    preload: preload,
    create: create,
    update: update
  }
}

const game = new Phaser.Game(config)

let player
let cursors

let positionY
let highFall = false

function preload() {
  this.load.image('bg1', 'images/bg1.png')
  this.load.image('bg2', 'images/bg2.png')
  this.load.image('bg3', 'images/bg3.png')
  this.load.image('plat-LG', 'images/platforms/quad-lg.png')
  this.load.image('plat-SM', 'images/platforms/quad-sm.png')
  this.load.image('plat-MD', 'images/platforms/quad-md.png')
  this.load.image('rect-MD', 'images/platforms/rect-md.png')
  this.load.image('chao', 'images/chao-teste.png');
  this.load.spritesheet('player', 'images/knight-sprite.png', {
    frameWidth: 32, frameHeight: 30
  })
}

function create() {
  
  const larguraJogo = this.sys.canvas.width;
  // const alturaJogo = this.sys.canvas.height;

  this.cameras.main.setBounds(0, 0, larguraJogo, 720*4);
  this.physics.world.setBounds(0, 0, larguraJogo, 720*4);

  this.add.image('0',' 0', 'bg3').setOrigin(0,0)
  this.add.image('0',' 600', 'bg3').setOrigin(0,0)
  this.add.image('0',' 1200', 'bg2').setOrigin(0,0)
  this.add.image('0',' 1800', 'bg1').setOrigin(0,0)

  
  const platform = this.physics.add.staticGroup()
  
  //platformas iniciais
  platform.create(100, 690*4, 'plat-LG')
  platform.create(700, 690*4, 'plat-LG')
  
  //chão com fisica e imagem para dar profundidade
  this.add.image('0','2785', 'chao').setOrigin(0,0)
  this.add.image('400','2785', 'chao').setOrigin(0,0)
  platform.create(100, 700*4, 'chao').setOrigin(0,0).refreshBody()
  platform.create(400, 700*4, 'chao').setOrigin(0,0).refreshBody()
  
  //platoformas(quads) menores
  platform.create(120, 598*4, 'plat-SM')
  platform.create(400, 570*4, 'plat-SM')
  platform.create(720, 550*4, 'plat-SM')
  platform.create(200, 520*4, 'plat-SM')
  platform.create(600, 490*4, 'plat-SM')
  platform.create(200, 460*4, 'plat-SM')
  platform.create(600, 400*4, 'plat-SM')
  platform.create(180, 250*4, 'plat-SM').setSize(100, 45).setDisplaySize(100,45)
  platform.create(620, 250*4, 'plat-SM').setSize(100, 45).setDisplaySize(100,45)

  platform.create(400, 180*4, 'plat-MD') 

  platform.create(220, 300*4, 'plat-SM')
  platform.create(220, 350*4, 'plat-SM')

  platform.create(120, 110*4, 'plat-SM')
  platform.create(680, 110*4, 'plat-SM')
  platform.create(400, 50*4, 'plat-SM')

  //platforms(rect) verticais
  platform.create(170, 320*4, 'rect-MD')

  player = this.physics.add.sprite(400, 680*4, 'player')
  player.setScale(1.9)
  player.setBounce(0);
  player.setCollideWorldBounds(true);

  const playerPostionX = player.x
  const playerPostionY = player.y

  this.cameras.main.startFollow(player, true, 0.05, 0.05);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { start: 8, end: 10 }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'player', frame: 0 } ],
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
    frames: this.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
    // frames: [ { key: 'player', frame: 5 } ],
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'jump-left',
    // frames: this.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
    frames: [ { key: 'player', frame: 12 } ],
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'fall-left',
    frames: [ { key: 'player', frame: 11 } ],
    frameRate: 10,
    repeat: -1
  })
  
  this.anims.create({
    key: 'fall-right',
    frames: [ { key: 'player', frame: 6 } ],
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'high-fall',
    frames: [ { key: 'player', frame: 7 } ],
    frameRate: 10,
  })

  this.physics.add.collider(player, platform)

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  
  if (cursors.left.isDown){
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
    player.setVelocityY(-500);

    if (cursors.right.isDown) {
      player.anims.play('jump-right')
    }
    if (cursors.left.isDown) {
      player.anims.play('jump-left')
    } 

  }

  if (!player.body.touching.down && cursors.left.isDown){
    player.anims.play('fall-left')
  }
  
  if (!player.body.touching.down && cursors.right.isDown){
    player.anims.play('fall-right')
  }

  if (player.body.onFloor()) {
    positionY = Math.round(player.y)
  }

  if (positionY < player.y && !player.body.onFloor()) {
    const fallHeight = (positionY - Math.round(player.y)) * -1
    
    console.log(fallHeight)
    if (fallHeight >= 200){
      highFall = true
    }
  }

  if (highFall && player.body.onFloor()){
    player.anims.play('high-fall')
  }

  if (cursors.left.isDown || cursors.right.isDown){
    highFall = false
  }
}

