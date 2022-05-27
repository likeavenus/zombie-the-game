import Phaser from 'phaser';

export const config = {
  type: Phaser.AUTO,
  parent: 'phaser',
  backgroundColor: 'red',
  pixelArt: true, // Prevent pixel art from becoming blurred when scaled.
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  autoFocus: true,
  scene: {
    preload,
    create,
  }
}

function preload() {}

function create() {
  const logo = this.add.image(400, 150, 'logo');
  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: 'Power2',
    yoyo: true,
    loop: -1
  });
}