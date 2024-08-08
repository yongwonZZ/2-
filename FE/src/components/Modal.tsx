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
                <p>{message}</p>
                <button onClick={onClose} className={styles.closeButton}>확인</button>
            </div>
        </div>
    );
}

export default Modal;