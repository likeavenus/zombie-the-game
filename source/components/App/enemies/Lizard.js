import Phaser from 'phaser';

const Direction = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
};

const randomDirection = (exclude) => {
    let newDirection = Object.values(Direction)[Phaser.Math.Between(0, 3)];
    while(newDirection === exclude) {
        newDirection = Object.values(Direction)[Phaser.Math.Between(0, 3)];
    }

    return newDirection;
}

export default class Lizard extends Phaser.Physics.Arcade.Sprite {
    direction = Direction.LEFT;
    moveEvent;
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.anims.play('lizard-idle');
        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this);

        this.moveEvent = scene.time.addEvent({
            delay: 2000,
            callback: () => {
                this.direction = randomDirection(this.direction);
            },
            loop: true,
        })
    }

    destroy(fromScene) {
        this.moveEvent.destroy();
        super.destroy(fromScene);
    }

    handleTileCollision(go, tile) {
        if (go !== this) {
            return;
        }
        this.direction = randomDirection(this.direction);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        const speed = 50;
        switch(this.direction) {
            case Direction.UP:
                this.setVelocity(0, -speed);
                break;
            case Direction.DOWN:
                this.setVelocity(0, speed);
                break;
            case Direction.RIGHT:
                this.setVelocity(speed, 0);
                break;
            case Direction.LEFT:
                this.setVelocity(-speed, 0);
                break;
        }
    }
}