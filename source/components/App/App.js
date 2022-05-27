import React from 'react';
import styles from './App.scss';
import { createBrowserHistory } from "history";
import {Router, Route, Switch} from "react-router-dom";
const history = createBrowserHistory();
import Default from "../Default";
import ScrollToTop from "react-router-scroll-top";


export default function App(props) {
    
    
    return (
        <div className={styles.app}>
           
            <Router history={history}>
                <ScrollToTop>
                    <Switch>
                        <Route exact path='/'>
                            <Default/>
                        </Route>
                    </Switch>
                </ScrollToTop>
            </Router>
       
        </div>
    );
}
