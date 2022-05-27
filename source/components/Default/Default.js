import React, {useContext} from 'react';
import styles from './Default.scss';
import girl from './assets/girl.jpg';



export default function Default(props) {

    

    return (
        <div className={styles.block}>
            Lol kek cheburek 7 voprosov gde otvet
            
            <img src={girl}/>
        </div>
    );
}
