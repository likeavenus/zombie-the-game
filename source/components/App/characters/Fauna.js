import Phaser from 'phaser';

const HealthState = {
    IDLE: 'idle',
    DAMAGE: 'damage',
    DEAD: 'dead',
};

export default class Fauna extends Phaser.Physics.Arcade.Sprite {
    healthState = HealthState.IDLE;
    damageTime = 0;
    knives;
    
    _health = 3;
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.anims.play('fauna-idle-down');
    }

    setKnives(knives) {
        this.knives = knives;
    }


    get health() {
        return this._health;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        switch(this.healthState) {
            case HealthState.IDLE:
                break;
            case HealthState.DEAD:
                // this.anims.play('dead')
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
        // if (this._health <= 0) {
        //     console.log(this)
        //     return;
        // }
        if (this.healthState === HealthState.DAMAGE) {
            return;
        }
        

        --this._health;

        if (this._health <= 0) {
            this.healthState = HealthState.DEAD;
            this.anims.play('fauna-faint');
            this.setVelocity(0, 0);
        } else {
            this.setVelocity(dir.x, dir.y);

            this.setTint(0xff0000);
            this.damageTime = 0;
            this.healthState = HealthState.DAMAGE;
        }
    }

    throwKnife() {
        if (!this.knives) {
            return;
        }
        const parts = this.anims.currentAnim.key.split('-');
        const direction = parts[2];
        const vec = new Phaser.Math.Vector2(0, 0);
        switch(direction) {
            case 'up':
                vec.y = -1;
                break;
            case 'down':
                vec.y = 1;
                break;
            default:
            case 'side':
                if (this.scaleX < 0) {
                    vec.x = -1;
                } else {
                    vec.x = 1;
                }
                break;
        }
        const angle = vec.angle();
        const knife = this.knives.get(this.x, this.y, 'knife');

        knife.setActive(true);
        knife.setVisible(true);

        knife.setRotation(angle);
        knife.x += vec.x * 16;
        knife.y += vec.y * 16;
        knife.setVelocity(vec.x * 300, vec.y * 300);
    }



    update(cursors, socket) {
        if (this.healthState === HealthState.DAMAGE || this.healthState === HealthState.DEAD) {
            return;
        }
        const speed = 100;
        if (!cursors) {
            return;
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.throwKnife();
            return;
        }

        if (cursors.left.isDown) {
            this.setVelocity(-speed, 0);
            this.anims.play('fauna-run-side', true);
            this.scaleX = -1;
            this.body.offset.x = 24;
            socket.emit('player_moved', {
                x: this.x,
                y: this.y,
                scaleX: this.scaleX,
                playerId: this.playerId,
                animationKey: 'fauna-run-side',
            });

        } else if (cursors.right.isDown) {
            this.setVelocity(speed, 0);
            this.anims.play('fauna-run-side', true);
            this.body.offset.x = 8;
            this.scaleX = 1;
            socket.emit('player_moved', {
                x: this.x,
                y: this.y,
                scaleX: this.scaleX,
                playerId: this.playerId,
                animationKey: 'fauna-run-side',
            })

        } else if (cursors.up.isDown) {
            this.setVelocity(0, -speed);
            this.anims.play('fauna-run-up', true);
            socket.emit('player_moved', {
                x: this.x,
                y: this.y,
                scaleX: this.scaleX,
                playerId: this.playerId,
                animationKey: 'fauna-run-up',
            })

        } else if (cursors.down.isDown) {
            this.setVelocity(0, speed);
            this.anims.play('fauna-run-down', true);
            socket.emit('player_moved', {
                x: this.x,
                y: this.y,
                scaleX: this.scaleX,
                playerId: this.playerId,
                animationKey: 'fauna-run-down',
            })
        } else {
            const parts = this.anims.currentAnim.key.split('-');
            parts[1] = 'idle';
            this.anims.play(parts.join('-'));
            this.setVelocity(0, 0);

            // socket.emit('player_moved', {
            //     x: this.x,
            //     y: this.y,
            //     scaleX: 1,
            //     playerId: this.playerId
            // })
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