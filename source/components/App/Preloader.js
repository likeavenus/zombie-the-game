import Phaser from 'phaser';

import DungeonImg from './assets/tiles/dungeon_tiles_extruded.png';
import DungeonJson from './assets/tiles/dungeon.json';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        this.load.image('tiles', DungeonImg);
        this.load.tilemapTiledJSON('dungeon', DungeonJson);
    }

    create() {
        this.scene.start('playGame');
    }
}