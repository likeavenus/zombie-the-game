import Phaser from 'phaser';
import { debugDraw } from './utils/debug';
import { createLizardAnims } from './components/App/anims/EnemyAnims';
import { characterAnims } from './components/App/anims/CharacterAnims';
import Lizard from './components/App/enemies/Lizard';

export default class PlayGame extends Phaser.Scene {
  cursors;
  hit = 0;
  constructor() {
    super('PlayGame');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fauna;
  }
  create() {
    characterAnims(this.anims);
    createLizardAnims(this.anims);
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon', 'tiles', 16, 16, 1, 2);

    map.createLayer('Ground', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);
    wallsLayer.setCollisionByProperty({ collides: true });
    // debugDraw(wallsLayer, this);

    this.fauna = this.physics.add.sprite(128, 128, 'fauna', 'walk-down-3.png');
    this.fauna.body.setSize(this.fauna.width * 0.5, this.fauna.height * 0.8);

    this.cameras.main.startFollow(this.fauna, true);

    this.fauna.anims.play('fauna-idle-down');

    const lizards = this.physics.add.group({
        classType: Lizard,
        createCallback: (go) => {
          const lizGo = go;
          lizGo.body.onCollide = true;
        }
    })
    lizards.get(256, 128, 'lizard');
    this.physics.add.collider(this.fauna, wallsLayer);
    this.physics.add.collider(lizards, wallsLayer);
    this.physics.add.collider(lizards, this.fauna, this.handlePlayerLizardCollision, undefined, this);
  }

  handlePlayerLizardCollision(obj1, obj2) {
    const lizard = obj2;
    const dx = this.fauna.x - lizard.x;
    const dy = this.fauna.y - lizard.y;
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);

    this.fauna.setVelocity(dir.x, dir.y);

    this.hit = 1;
  }

  update() {
    if (this.hit > 0) {
      ++this.hit;
      if (this.hit > 10) {
        this.hit = 0;
      }
      return;
    }
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

