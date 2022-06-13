import React, {useEffect, useState, useRef} from 'react';
import { nanoid } from 'nanoid';
import styles from './CursorsBattle.scss';
import io from 'socket.io-client'
// Сервер использует порт 5000, этот порт определен в файле server.js, запросы отправляем туда
const SERVER_URL = 'http://localhost:5000';


export default function CursorsBattle(props) {
    const socketRef = useRef(null)
    const [user, setNewUser] = useState({})
    const [cursors, setCursors] = useState([])
    
    useEffect(() => {
        // Генерируем id нового пользователя (открытая вкладка с игрой)
        const newUserId = nanoid();
        
        // Создаем нового пользователя
        setNewUser({
            userID: newUserId
        })
        
        // Создаем под нашего пользователя курсор со стартовой позицией
        const newCursor = {
            cursorID: user.userID,
            x:0,
            y:0
        };
        setCursors([...cursors, newCursor])
        
        socketRef.current = io(SERVER_URL)
        socketRef.current.emit('user:add')
        
        
        return () => {
            socketRef.current.disconnect()
        }
    }, [])
    
    const mouseHandler = (e) => {
        
        const {offsetLeft, offsetTop} = e.target;
        
        const updatedCursorsArray = cursors.map(cursor => {
            if (cursor.cursorID === user.userID) {
                cursor.x = offsetTop;
                cursor.y = offsetLeft;
            }
            
            return cursor;
        })
        
        setCursors(updatedCursorsArray)
        
        
        console.dir(e.target)
    }
    
    return (
        <div className={styles.wrapper}>
            <h1>Cursors Battle</h1>
            <br/>
            <div className={styles.field} onMouseMove={mouseHandler}>
                {cursors.map((cursor) => {
                    return <div key={cursor.cursorID} className={styles.cursor} style={{left: cursor.x, top: cursor.y}}/>
                })}
            </div>
        </div>
    );
}
