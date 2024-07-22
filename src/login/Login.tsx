import React, { useState } from 'react';
import './Login.css'; // CSS 파일을 임포트
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const testID: string = 'test@naver.com';
    const testPassword: string = "P@ssw0rd";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const testLogin = () => {
        if (email === testID && password === testPassword) {
            navigate('/myPage');
        } else {
            setError('아이디 또는 비밀번호가 틀렸습니다.');
        }
    };

    return (
        <>
            <div>
                <h3>로그인</h3>
            </div>
            <div className="login-container">
                <input
                    className="email-input"
                    id="email-input"
                    type="email"
                    name="email"
                    placeholder="이메일 입력"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="password-input"
                    id="password-input"
                    type="password"
                    name="password"
                    placeholder="비밀번호 입력"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <div className="button-container">
                    <button
                        className="login-button"
                        onClick={testLogin}
                    >
                        로그인
                    </button>
                    <button
                        className="signup-button"
                        onClick={() => navigate('/create-account')}
                    >
                        회원가입
                    </button>
                </div>
            </div>
        </>
    );
}

export default Login;
