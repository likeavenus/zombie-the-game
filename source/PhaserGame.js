import Phaser from 'phaser';
import FaunaJson from './components/App/assets/characters/fauna.json';
import FaunaPng from './components/App/assets/characters/fauna.png';
import { debugDraw } from './utils/debug';

export default class PlayGame extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  preload() {
    this.load.atlas('fauna', FaunaPng, FaunaJson);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fauna;
  }
  create() {

    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon', 'tiles', 16, 16, 1, 2);

    map.createLayer('Ground', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);
    wallsLayer.setCollisionByProperty({ collides: true });
    // debugDraw(wallsLayer, this);

    this.fauna = this.physics.add.sprite(128, 128, 'fauna', 'walk-down-3.png');
    this.fauna.body.setSize(this.fauna.width * 0.5, this.fauna.height * 0.8);

    this.cameras.main.startFollow(this.fauna, true);

    this.anims.create({
        key: 'fauna-idle-down',
        frames: [{ key: 'fauna', frame: 'walk-down-3.png' }]
    });

    this.anims.create({
        key: 'fauna-idle-up',
        frames: [{ key: 'fauna', frame: 'walk-up-3.png' }]
    });

    this.anims.create({
        key: 'fauna-idle-side',
        frames: [{ key: 'fauna', frame: 'walk-side-3.png' }]
    });


    this.anims.create({
        key: 'fauna-run-down',
        frames: this.anims.generateFrameNames('fauna', {
            start: 1,
            end: 8,
            prefix: 'run-down-',
            suffix: '.png',
        }),
        repeat: -1,
        frameRate: 16,
    });

    this.anims.create({
        key: 'fauna-run-up',
        frames: this.anims.generateFrameNames('fauna', {
            start: 1,
            end: 8,
            prefix: 'run-up-',
            suffix: '.png',
        }),
        repeat: -1,
        frameRate: 16,
    });

    this.anims.create({
        key: 'fauna-run-side',
        frames: this.anims.generateFrameNames('fauna', {
            start: 1,
            end: 8,
            prefix: 'run-side-',
            suffix: '.png',
        }),
        repeat: -1,
        frameRate: 16,
    });

    this.physics.add.collider(this.fauna, wallsLayer);
    this.fauna.anims.play('fauna-idle-down');
  }

  update() {
    const speed = 100;
    if (!this.cursors || !this.fauna) {
      return;
    }

    if (this.cursors.left.isDown) {
        this.fauna.setVelocityX(-speed);
        this.fauna.anims.play('fauna-run-side', true);

        this.fauna.scaleX = -1;
        this.fauna.body.offset.x = 24;

    } else if (this.cursors.right.isDown) {
        this.fauna.setVelocityX(speed);
        this.fauna.anims.play('fauna-run-side', true);
        this.fauna.body.offset.x = 8;
        this.fauna.scaleX = 1;

    } else if (this.cursors.up.isDown) {
        this.fauna.setVelocityY(-speed);
        this.fauna.anims.play('fauna-run-up', true);
        
    } else if (this.cursors.down.isDown) {
        this.fauna.setVelocityY(speed);
        this.fauna.anims.play('fauna-run-down', true);
    } else {
        const parts = this.fauna.anims?.currentAnim?.key.split('-');
        parts[1] = 'idle';
        this.fauna.play(parts.join('-'));
        this.fauna.setVelocity(0, 0);
    }
  }
}

