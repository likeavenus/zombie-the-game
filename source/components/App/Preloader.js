import Phaser from 'phaser';
import { Redirect } from 'react-router-dom';

import DungeonImg from './assets/tiles/dungeon_tiles_extruded.png';
import DungeonJson from './assets/tiles/dungeon.json';
import FaunaJson from './assets/characters/fauna.json';
import FaunaPng from './assets/characters/fauna.png';
import LizardPng from './assets/enemies/lizard.png';
import LizardJson from './assets/enemies/lizard.json';
import HurtSound from './assets/hurt-sound.mp3';
import HeartEmpty from './assets/ui/ui_heart_empty.png';
import HeartFull from './assets/ui/ui_heart_full.png';
import KnifeImg from './assets/weapons/weapon_knife.png';

const playerName = localStorage.getItem('playerName');


export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        this.load.image('tiles', DungeonImg);
        this.load.tilemapTiledJSON('dungeon', DungeonJson);
        this.load.atlas('fauna', FaunaPng, FaunaJson);
        this.load.atlas('lizard', LizardPng, LizardJson);
        this.load.audio('hurt', HurtSound);
        this.load.image('heart-full', HeartFull);
        this.load.image('heart-empty', HeartEmpty);
        this.load.image('knife', KnifeImg);
    }

    create() {
        this.scene.start('PlayGame');
    }
}
