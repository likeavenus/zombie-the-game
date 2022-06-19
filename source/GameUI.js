import Phaser from 'phaser';
import { sceneEvents } from './components/App/events/EventCenter';

export default class GameUI extends Phaser.Scene {
    hearts;
    constructor() {
        super({ key: 'game-ui' });
    }

    create() {
        this.hearts = this.add.group({
            classType: Phaser.GameObjects.Image,
        });

        this.hearts.createMultiple({
            key: 'heart-full',
            setXY: {
                x: 10,
                y: 10,
                stepX: 16,
            },
            quantity: 3,
        });

        sceneEvents.on('player-health-changed', this.handlePlayerHealthChanged, this);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('player-health-changed', this.handlePlayerHealthChanged, this);
        })
    }

    handlePlayerHealthChanged(health) {
        this.hearts.children.each((go, index) => {
            const heart = go;
            if (index < health) {
                heart.setTexture('heart-full');
            } else {
                heart.setTexture('heart-empty');
            }
        });
    }
}