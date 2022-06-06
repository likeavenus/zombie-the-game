import Phaser from 'phaser';
import DudeImg from './components/App/assets/dude.png';
import BulletImg from './components/App/assets/bullet7.png';
import LevelJSON from './components/App/assets/level.json';
import BlockImg from './components/App/assets/block.png';

let testPlayer;
let testPlayer2;
export class playGame extends Phaser.Scene {
  cursors;
  player;
  bullets;
  keySpace;
  constructor() {
    super('PlayGame');
  }
  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  preload() {
    this.load.spritesheet('dude', DudeImg, { frameWidth: 32, frameHeight: 48 });
    this.load.image('bullet', BulletImg);

    this.load.image('block', BlockImg)
		this.load.tilemapTiledJSON('Map', LevelJSON)
  }
  create() {
    const map = this.make.tilemap({ key: 'Map' })
		const tileset = map.addTilesetImage('block', 'block');
		map.createLayer('Map', tileset);

    this.player = this.matter.add.sprite(100, 450, 'dude', null, {
      // isStatic: true,
    });

    var cat1 = this.matter.world.nextCategory();
    var cat2 = this.matter.world.nextCategory();

    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.player.setBounce(1);
    this.player.setFrictionAir(0);

    testPlayer = this.matter.add.image(400, 300, 'dude');
    testPlayer.setVelocity(10, 10);
    testPlayer.setBounce(1);
    testPlayer.setFrictionAir(0);

    testPlayer2 = this.matter.add
      .image(400, 300, 'dude')
      .setBounce(1)
      .setFrictionAir(0);

    this.player.setCollisionCategory(cat1);
    testPlayer.setCollisionCategory(cat1);
    testPlayer2.setCollisionCategory(cat1);

    this.player.setCollidesWith([cat1]);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.matter.world.on('collisionstart', function (event) {
      if (event.pairs[0].bodyA.gameObject) {
      }
    });
  }

  update() {
    if (this.keySpace.isDown) {
      console.log(this.player)
      this.bullets = this.matter.add.image(this.player.x, this.player.y, 'bullet');
    }
    if (this.cursors.left.isDown) {
      this.player.x -= 4;
      // this.player.setVelocity(-4, 0)
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.x += 4;
      this.player.anims.play('right', true);
    } else {
      this.player.anims.play('turn');
      // this.player.setVelocity(0, 0)
    }
    if (this.cursors.up.isDown) {
      this.player.y -= 4;
    }
    if (this.cursors.down.isDown) {
      this.player.y += 4;
    }
  }
}
