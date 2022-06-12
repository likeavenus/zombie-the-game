import Phaser from 'phaser';

import DungeonImg from './assets/tiles/dungeon_tiles_extruded.png';
import DungeonJson from './assets/tiles/dungeon.json';
import FaunaJson from './assets/characters/fauna.json';
import FaunaPng from './assets/characters/fauna.png';
import LizardPng from './assets/enemies/lizard.png';
import LizardJson from './assets/enemies/lizard.json';
export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        this.load.image('tiles', DungeonImg);
        this.load.tilemapTiledJSON('dungeon', DungeonJson);
        this.load.atlas('fauna', FaunaPng, FaunaJson);
        this.load.atlas('lizard', LizardPng, LizardJson);
    }

    create() {
        this.scene.start('PlayGame');
    }
}