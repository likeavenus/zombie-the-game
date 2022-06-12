import Phaser from 'phaser';
import Preloader from './components/App/Preloader';
import PlayGame from './PhaserGame';

export const config = {
  type: Phaser.AUTO,
  parent: 'phaser',
  width: 400,
  height: 250,
  scene: [Preloader, PlayGame],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0, x: 0 }
    },
  },
  scale: {
    zoom: 2,
  }
};