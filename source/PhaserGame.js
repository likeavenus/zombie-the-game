import Phaser from 'phaser';
import Preloader from './components/App/Preloader';

class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');
    }

    fire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-300);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.y <= -32)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
      console.log(scene)
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 5,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(x, y);
        }
    }
}

export class playGame extends Phaser.Scene {
  constructor() {
    super('playGame');
  }
  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  preload() {
  }
  create() {


  }

  update() {
    // if (this.cursors.left.isDown) {
    //   this.direction = 'left';
    //   this.player.x -= 4;
    //   // this.player.setVelocity(-4, 0)
    //   this.player.anims.play('left', true);
    // } else if (this.cursors.right.isDown) {
    //   this.direction = 'right';
    //   this.player.x += 4;
    //   this.player.anims.play('right', true);
    // } else {
    //   this.player.anims.play('turn');
    //   // this.player.setVelocity(0, 0)
    // }
    // if (this.cursors.up.isDown) {
    //   this.direction = 'up';
    //   this.player.y -= 4;
    //   // this.player.setVelocity(0, -4);
    // }
    // if (this.cursors.down.isDown) {
    //   this.direction = 'down';
    //   this.player.y += 4;
    // }
  }
}

export const config = {
  type: Phaser.AUTO,
  parent: 'phaser',
  width: 400,
  height: 250,
  scene: [Preloader, playGame],
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