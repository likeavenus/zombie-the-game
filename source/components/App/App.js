import React from 'react';
import styles from './App.scss';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
const history = createBrowserHistory();
import ScrollToTop from 'react-router-scroll-top';
import CursorsBattle from "../CursorsBattle";
import StartPage from "../StartPage";
import GamePage from "../GamePage";

export default function App(props) {

    return (
        <div className={styles.app}>
            <Router history={history}>
                <ScrollToTop>
                    <Switch>
                        <Route exact path='/'>
                            <StartPage/>
                        </Route>
                        <Route exact path='/game'>
                            <GamePage/>
                        </Route>
                        <Route exact path='/cursors'>
                            <CursorsBattle/>
                        </Route>
                    </Switch>
                </ScrollToTop>
            </Router>
       
        </div>
    );
}
