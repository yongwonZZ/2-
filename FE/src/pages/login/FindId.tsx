import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Modal from '../../components/Modal'; // 모달 컴포넌트 임포트
import styles from '../../styles/findId/FindId.module.css';

const FindId: React.FC = () => {
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleFindId = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/api/find-user`, {
                params: { phoneNumber: phone },
            });

            setEmail(response.data.email);
            setShowModal(true); // 모달 표시
        } catch (error: any) {
            setError(error.response?.data?.message || '아이디를 찾을 수 없습니다.');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (email) {
            // 로그인 페이지로 이동
            window.location.href = '/login';
        }
    };

    return (
        <div>
            <Header leftContent="아이디 찾기" />
            <div className={styles.findIdContainer}>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleFindId} className={styles.form}>
                    <input
                        type="text"
                        placeholder="핸드폰 번호 입력"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>아이디 찾기</button>
                </form>
                {showModal && email && (
                    <Modal
                        message={`회원님의 아이디는 ${email}입니다.`}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
};

export default FindId;
