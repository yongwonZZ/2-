import React, { useState } from 'react';
import Header from '../../components/Header';
import '../../styles/findId/FindId.css';

const FindId: React.FC = () => {
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string | null>(null);
    const [error, setError] = useState<string>('');

    const handleFindId = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // 여기에 아이디 찾기 로직을 추가합니다.
            // 예: API 요청을 통해 전화번호로 이메일 찾기
            const response = await fetch('http://localhost:5000/api/find-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone }),
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
            <div className="find-id-container">
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleFindId}>
                    <input
                        type="text"
                        placeholder="핸드폰 번호 입력"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <button type="submit">아이디 찾기</button>
                </form>
                {email && (
                    <div className="result">
                        <p>회원님의 아이디는 {email}입니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindId;
