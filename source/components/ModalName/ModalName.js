import styles from '../App/App.scss';
import { Modal } from '../Modal/Modal';
import React, { useState, useEffect } from 'react';
const storagePlayerName = localStorage.getItem('playerName');

const saveName = (name) => {
  localStorage.setItem('playerName', name);
}
export const ModalName = () => {
  const [inputName, setInputName] = useState('');
  const [isModalActive, setModal] = useState(!storagePlayerName);
  const setPlayerStatus = () => {
    if (inputName) {
      setModal(false);
      saveName(inputName.slice(0, 10));
    }
  };

  const onEnterSave = (e) => {
    if (e.key === 'Enter') {
      console.log(e)
      setPlayerStatus();
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', onEnterSave);
    return () => window.removeEventListener('keypress', onEnterSave);
  }, [onEnterSave]);
  return (
    <Modal open={isModalActive}>
      <p className={styles.enter_name}>Enter name:</p>
      <input className={styles.input_name} onChange={e => setInputName(e.target.value)} value={inputName} />
      <button disabled={!inputName} onClick={setPlayerStatus} className={styles.save_name}>Save</button>
    </Modal>
  )
}
