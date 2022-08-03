import Phaser from 'phaser';
import { debugDraw } from './utils/debug';
import { createLizardAnims } from './components/App/anims/EnemyAnims';
import { characterAnims } from './components/App/anims/CharacterAnims';
import Lizard from './components/App/enemies/Lizard';
import { getRandomIntFromRange } from './utils/utils';
import { sceneEvents } from './components/App/events/EventCenter';
import { io } from 'socket.io-client';
import './components/App/characters/Fauna';

// const socket = io();

function addPlayer(self, playerInfo, wallsLayer) {
  self.fauna = self.add.fauna(playerInfo.x, playerInfo.y, 'fauna');
  self.cameras.main.startFollow(self.fauna, true);
  self.fauna.setKnives(self.knives);
  self.fauna.playerId = playerInfo.playerId;
  self.physics.add.collider(self.fauna, wallsLayer, self.handlePlayerWallsColision, undefined, self);
  self.playerLizardsCollider = self.physics.add.collider(self.lizards, self.fauna, self.handlePlayerLizardCollision, undefined, self);
  return self.fauna;
}

function addOtherPlayers(self, playerInfo, wallsLayer) {
  const otherPlayer = self.add.fauna(playerInfo.x, playerInfo.y, 'fauna');
  self.physics.add.collider(otherPlayer, wallsLayer, self.handlePlayerWallsColision, undefined, self);
  self.playerLizardsCollider = self.physics.add.collider(self.lizards, self.fauna, self.handlePlayerLizardCollision, undefined, self);
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers = self.otherPlayers.add(otherPlayer);
}

export default class PlayGame extends Phaser.Scene {
  cursors;
  hit = 0;
  hurtSound;
  playerLizardsCollider;
  knives;
  lizards;

  constructor() {
    super('PlayGame');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  create() {
    this.scene.run('game-ui');
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon', 'tiles', 16, 16, 1, 2);
    const wallsLayer = map.createLayer('Walls', tileset);
    wallsLayer.setCollisionByProperty({ collides: true });
    this.otherPlayers = this.physics.add.group();

    this.socket = io();
    // this.socket.on('connect', () => {
    //   console.log('Connected: ', this.socket.id)
    // });
    this.socket.on('current_players', (players) => {
      Object.keys(players).forEach((id) => {
        if (players[id].playerId === this.socket.id) {
          addPlayer(this, players[id], wallsLayer);
        } else {
          addOtherPlayers(this, players[id], wallsLayer);
        }
      });
    });

    this.socket.on('new_player', (playerInfo) => {
      addOtherPlayers(this, playerInfo, wallsLayer);
    });
    this.socket.on('remove_player', (playerId) => {
      this.otherPlayers.getChildren().forEach((otherPlayer) => {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    });


    this.socket.on('update_positions', (player) => {
      this.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (player.playerId === otherPlayer.playerId) {
          console.log('player: ', player)
          otherPlayer.x = player.x;
          otherPlayer.y = player.y;
          otherPlayer.scaleX = player.scaleX;
          console.log('otherPlayer: ', otherPlayer)
          otherPlayer.anims.play(player.animationKey, true);
        }
      });
    })

    characterAnims(this.anims);
    createLizardAnims(this.anims);

    const soundManager = new Phaser.Sound.WebAudioSoundManager(this.game);
    this.hurtSound = new Phaser.Sound.WebAudioSound(soundManager, 'hurt');

    map.createLayer('Ground', tileset);

    // debugDraw(wallsLayer, this);



    this.knives = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image
    });


    this.lizards = this.physics.add.group({
        classType: Lizard,
        createCallback: (go) => {
          const lizGo = go;
          lizGo.body.onCollide = true;
        },
    });

    // this.lizards.get(226, 128, 'lizard');
    this.physics.add.collider(this.lizards, wallsLayer);
    this.physics.add.collider(this.knives, wallsLayer, this.handleKnifeWallCollision, undefined, this);
    this.physics.add.collider(this.knives, this.lizards, this.handleKnifeLizardCollision, undefined, this);

  }

  handleKnifeLizardCollision(obj1, obj2) {
    this.knives.killAndHide(obj1);
		this.lizards.killAndHide(obj2);
  }

  handleKnifeWallCollision(obj1) {
    this.knives.killAndHide(obj1);
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
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(180);
    this.fauna.handleDamage(dir);

    sceneEvents.emit('player-health-changed', this.fauna.health);

    if (this.fauna.health <= 0) {
      this.playerLizardsCollider.destroy();
    }
  }

  update() {
    if (this.fauna) {
      this.fauna.update(this.cursors, this.socket);
    }
  }
}

