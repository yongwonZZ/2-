import React, { useState } from 'react';
import Header from '../../components/Header';
import styles from '../../styles/findId/FindId.module.css';

const FindId: React.FC = () => {
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string | null>(null);
    const [error, setError] = useState<string>('');

    const handleFindId = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/find-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber: phone }),
            });

            if (!response.ok) {
                throw new Error('아이디를 찾을 수 없습니다.');
            }

            const data = await response.json();
            setEmail(data.email);
        } catch (error: any) {
            setError(error.message);
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
                {email && (
                    <div className={styles.result}>
                        <p>회원님의 아이디는 {email}입니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindId;
