import React from 'react';
import styles from './App.scss';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
const history = createBrowserHistory();
import Game from '../Game';
import ScrollToTop from 'react-router-scroll-top';
import Phaser from 'phaser';
import { config } from '../../PhaserGame';

const game = new Phaser.Game(config);

export default function App(props) {

    return (
        <div className={styles.app}>
            <Router history={history}>
                <ScrollToTop>
                    <Switch>
                        <Route exact path='/'>
                            <Game/>
                        </Route>
                    </Switch>
                </ScrollToTop>
            </Router>
       
        </div>
    );
}
