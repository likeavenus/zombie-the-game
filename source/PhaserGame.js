import Phaser from 'phaser';
import { debugDraw } from './utils/debug';
import { createLizardAnims } from './components/App/anims/EnemyAnims';
import { characterAnims } from './components/App/anims/CharacterAnims';
import Lizard from './components/App/enemies/Lizard';
import { getRandomIntFromRange } from './utils/utils';
import { sceneEvents } from './components/App/events/EventCenter';

import './components/App/characters/Fauna';

export default class PlayGame extends Phaser.Scene {
  cursors;
  hit = 0;
  hurtSound;
  constructor() {
    super('PlayGame');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fauna;
  }
  create() {
    this.scene.run('game-ui');

    characterAnims(this.anims);
    createLizardAnims(this.anims);
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon', 'tiles', 16, 16, 1, 2);
    const soundManager = new Phaser.Sound.WebAudioSoundManager(this.game);
    this.hurtSound = new Phaser.Sound.WebAudioSound(soundManager, 'hurt');

    map.createLayer('Ground', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);
    wallsLayer.setCollisionByProperty({ collides: true });
    // debugDraw(wallsLayer, this);

    this.fauna = this.add.fauna(128, 128, 'fauna');

    this.cameras.main.startFollow(this.fauna, true);


    const lizards = this.physics.add.group({
        classType: Lizard,
        createCallback: (go) => {
          const lizGo = go;
          lizGo.body.onCollide = true;
        }
    });

    lizards.get(226, 128, 'lizard');
    this.physics.add.collider(this.fauna, wallsLayer, this.handlePlayerWallsColision, undefined, this);
    this.physics.add.collider(lizards, wallsLayer);
    this.physics.add.collider(lizards, this.fauna, this.handlePlayerLizardCollision, undefined, this);
  }

  handlePlayerWallsColision() {
    const parts = this.fauna.anims.currentAnim.key.split('-');
    parts[1] = 'idle';
    this.fauna.anims.play(parts.join('-'));
    this.fauna.setVelocity(0, 0);
  }

  handlePlayerLizardCollision(_, obj2) {
    /** немного детюним звук урона, что бы не надоедала однотипность звука. значения можно выставлять от -1200 до 1200 */
    const random = getRandomIntFromRange(0, 500);
    this.hurtSound.setDetune(random);
    this.hurtSound.play();
    const lizard = obj2;
    const dx = this.fauna.x - lizard.x;
    const dy = this.fauna.y - lizard.y;
    /** рассчитываем в какую сторону будет отскок от врага при столкновении */
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(220);
    this.fauna.handleDamage(dir);

    sceneEvents.emit('player-health-changed', this.fauna.health);
  }

  update() {
    if (this.fauna) {
      this.fauna.update(this.cursors);
    }
  }
}

