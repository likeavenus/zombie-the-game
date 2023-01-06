import React from 'react';
import styles from './styles.scss';
import { createPortal } from 'react-dom';

const modalContainer = document.querySelector('#modal');

export const Modal = ({ open, children }) => {
  return (
    <>
    {open ? createPortal(
        <div className={styles.modal_background}>
          <div className={styles.modal}>{children}</div>
        </div>
      , modalContainer) : null}
    </>
  )
};