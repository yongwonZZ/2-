import React from 'react';
import styles from '../styles/components/Modal.module.css';

interface ModalProps {
    message: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>회원님의 계정</h2>
                <div className={styles.messageBox}>
                    <p>{message}</p>
                </div>
                <button onClick={onClose} className={styles.closeButton}>확인</button>
            </div>
        </div>
    );
}

export default Modal;
