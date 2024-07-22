import React from 'react';
import './Login.css'; // CSS 파일을 임포트
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
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
                    required
                />
                <input
                    className="password-input"
                    id="password-input"
                    type="password"
                    name="password"
                    placeholder="비밀번호 입력"
                    required
                />
                <div className="button-container">
                    <button className="login-button">로그인</button>
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
