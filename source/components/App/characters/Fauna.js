import Phaser from 'phaser';

const HealthState = {
    IDLE: 'idle',
    DAMAGE: 'damage',
};

export default class Fauna extends Phaser.Physics.Arcade.Sprite {
    healthState = HealthState.IDLE;
    damageTime = 0;
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.anims.play('fauna-idle-down');

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        switch(this.healthState) {
            case HealthState.IDLE:
                break;
            case HealthState.DAMAGE:
                this.damageTime += dt;
                if (this.damageTime >= 250) {
                    this.healthState = HealthState.IDLE;
                    this.setTint(0xffffff);
                    this.damageTime = 0;
                }
                break;
        }
    }

    handleDamage(dir) {
        if (this.healthState === HealthState.DAMAGE) {
            return;
        }
        this.setVelocity(dir.x, dir.y);

        this.setTint(0xff0000);
        this.damageTime = 0;
        this.healthState = HealthState.DAMAGE;
    }

    update(cursors) {
        if (this.healthState === HealthState.DAMAGE) {
            return;
        }
        const speed = 100;
        if (!cursors) {
            return;
        }

        if (cursors.left.isDown) {
            this.setVelocityX(-speed);
            this.anims.play('fauna-run-side', true);

            this.scaleX = -1;
            this.body.offset.x = 24;

        } else if (cursors.right.isDown) {
            this.setVelocityX(speed);
            this.anims.play('fauna-run-side', true);
            this.body.offset.x = 8;
            this.scaleX = 1;

        } else if (cursors.up.isDown) {
            this.setVelocityY(-speed);
            this.anims.play('fauna-run-up', true);

        } else if (cursors.down.isDown) {
            this.setVelocityY(speed);
            this.anims.play('fauna-run-down', true);
        } else {
            const parts = this.anims?.currentAnim?.key.split('-');
            parts[1] = 'idle';
            this.anims.play(parts.join('-'));
            this.setVelocity(0, 0);
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('fauna', function (x, y, texture, frame) {
    const sprite = new Fauna(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);
    sprite.setSize(sprite.width * 0.5, sprite.height * 0.8);

    return sprite;
})