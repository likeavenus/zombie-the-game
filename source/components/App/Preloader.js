import Phaser from 'phaser';

import DungeonImg from './assets/dungeon_tiles.png';
import DungeonJson from './assets/dungeon.json';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        this.load.image('tiles', DungeonImg);
        this.load.tilemapTiledJSON('dungeon', DungeonJson);
    }

    create() {
        
        const map = this.make.tilemap({ key: 'dungeon' });
        const tileset = map.addTilesetImage('dungeon', 'tiles');

        map.createLayer('Ground', tileset);
        const wallsLayer = map.createLayer('Walls', tileset);
        wallsLayer.setCollisionByProperty({ collides: true });

        const debugGraphics = this.add.graphics().setAlpha(0.7);
        wallsLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        })
    }
}