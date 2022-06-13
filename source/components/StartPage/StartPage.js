import React from 'react';
import styles from './StartPage.scss';
import {Link} from "react-router-dom";

export default function StartPage(props) {
    return (
        <div className={styles.StartPage}>
            <h1>Доров</h1>
            <br/><br/><br/>
            <h2>Тут ссылки на разные страницы:</h2>
            <br/><br/>
            <Link to={'/game'}>Играться в игру на Phaser =></Link>
            <br/><br/>
            <Link to={'/cursors'}>Играться в игру на Socket.io =></Link>
        </div>
    );
}
