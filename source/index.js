import React from 'react';
import { render } from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import './styles/global.scss';
import App from './components/App';
import Phaser from 'phaser';
import { config } from './constants';



const game = new Phaser.Game(config);

const Root = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
};

render(
    <Root/>,
    document.getElementById('root')
);