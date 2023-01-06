import Phaser from 'phaser';
import Preloader from './components/App/Preloader';
import PlayGame from './PhaserGame';
import GameUI from './GameUI';

export const config = {
  type: Phaser.AUTO,
  parent: 'phaser',
  width: 600,
  height: 600,
  scene: [Preloader, PlayGame, GameUI],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      gravity: { y: 0, x: 0 }
    },
  },
  scale: {
    zoom: 2,
  }
};
