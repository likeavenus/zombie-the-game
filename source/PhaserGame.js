import Phaser from 'phaser';
import DudeImg from './components/App/assets/dude.png';
import BackgroundImg from './components/App/assets/background.png';

let player;
let cursors;
export class playGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }
  preload() {
    this.load.spritesheet('dude', DudeImg, { frameWidth: 32, frameHeight: 48 });
    this.load.atlas('dude', 'dude.png', 'dude.json');
    this.load.image('background', BackgroundImg);
  }
  create() {
    this.matter.world.disableGravity();
    this.add.tileSprite(0, 0, 1920, 1920, 'background');
    this.add.sprite(150, 450, 'dude')
    player = this.add.sprite(100, 450, 'dude');

    cursors = this.input.keyboard.createCursorKeys();

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
  }

  update() {
    if (cursors.left.isDown) {
        player.x -= 4;
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.x += 4;
        player.anims.play('right', true);
    } else {
        player.anims.play('turn');
    }
    if (cursors.up.isDown) {
      player.y -= 4;
    }
    if (cursors.down.isDown) {
      player.y += 4;
    }
  }
}