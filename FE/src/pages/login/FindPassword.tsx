import React, { useState } from 'react';
import Header from '../../components/Header';
import '../../styles/findPassowrd/findPassword.css';

const FindPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleFindPassword = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // 여기에 비밀번호 찾기 로직을 추가합니다.
            // 예: API 요청을 통해 이메일로 비밀번호 찾기
            const response = await fetch(`${process.env.VM_REACT_APP_API_URL}/find-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('비밀번호 찾기에 실패했습니다.');
            }

            setMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div>
            <Header leftContent="비밀번호 찾기" />
            <div className="find-password-container">
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleFindPassword}>
                    <input
                        type="email"
                        placeholder="이메일 입력"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">비밀번호 찾기</button>
                </form>
                {message && (
                    <div className="result">
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindPassword;
