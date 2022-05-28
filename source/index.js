import React from 'react';
import { render } from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import './styles/global.scss';
import App from './components/App';
import { playGame } from './PhaserGame';
import Phaser from 'phaser';


export const config = {
  type: Phaser.AUTO,
  parent: 'phaser',
  width: 800,
  height: 600,
  scene: playGame,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: false,
    },
  },
};
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
)