import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Header from "../publicComponents/Header";
import Navbar from "../publicComponents/Navbar";
import { login } from './LoginAPI'; // 수정된 경로

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const data = await login(email, password);
            if (data.success) {
                navigate('/myPage');
            } else {
                setError('아이디 또는 비밀번호가 틀렸습니다.');
            }
        } catch (error) {
            // @ts-ignore
            setError(error.message);
        }
    };

    return (
        <>

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
                        onClick={handleLogin}
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
            <Navbar />
        </>
    );
}

export default Login;
