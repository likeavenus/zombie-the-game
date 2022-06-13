import React, { useEffect } from 'react';
import styles from './GamePage.scss';
import Phaser from 'phaser';
import { config } from '../../constants';





export default function GamePage(props) {
    useEffect(() => {
        const game = new Phaser.Game(config);
    }, []);
    
    
    return (
        <div className={styles.GamePage} id={'phaser'}></div>
    );
}
