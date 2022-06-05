import Phaser from 'phaser';
import DudeImg from './components/App/assets/dude.png';
import BackgroundImg from './components/App/assets/background.png';
import BulletImg from './components/App/assets/bullet7.png';


let testPlayer;
let testPlayer2;
export class playGame extends Phaser.Scene {
  cursors;
  player;
  bullets;
  constructor() {
    super('PlayGame');
  }
  init() {
    console.log('Init');
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  preload() {
    this.load.spritesheet('dude', DudeImg, { frameWidth: 32, frameHeight: 48 });
    this.load.image('background', BackgroundImg);
    this.load.image('bullet', BulletImg);
  }
  create() {
    this.add.tileSprite(0, 0, 1920, 1920, 'background');
    this.player = this.matter.add.sprite(100, 450, 'dude', null, {
      isStatic: true
    });

    var cat1 = this.matter.world.nextCategory();
    var cat2 = this.matter.world.nextCategory();
    
    this.player.setBounce(1);
    this.player.setFrictionAir(0);

    testPlayer = this.matter.add.image(400, 300, 'dude');
    testPlayer.setVelocity(10, 10);
    testPlayer.setBounce(1);
    testPlayer.setFrictionAir(0)

    testPlayer2 = this.matter.add.image(400, 300, 'dude').setBounce(1).setFrictionAir(0);
    
    this.player.setCollisionCategory(cat1);
    testPlayer.setCollisionCategory(cat1);
    testPlayer2.setCollisionCategory(cat1);

    this.player.setCollidesWith([ cat1 ]);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.matter.world.on('collisionstart', function (event) {
      console.log(event.pairs[0]);

      event.pairs[0].bodyB.gameObject.setTint(0xff0000);
      if (event.pairs[0].bodyA.gameObject) {
        event.pairs[0].bodyA.gameObject.setTint(0x00ff00);

      }


  });
  }

  update() {
    if (this.cursors.left.isDown) {
        this.player.x -= 4;
        this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
        this.player.x += 4;
        this.player.anims.play('right', true);
    } else {
        this.player.anims.play('turn');
    }
    if (this.cursors.up.isDown) {
      this.player.y -= 4;
    }
    if (this.cursors.down.isDown) {
      this.player.y += 4;
    }
  }
}