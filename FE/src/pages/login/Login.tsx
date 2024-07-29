import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { LoginAction } from './LoginAction'; // 수정된 경로

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const data = await LoginAction(email, password);
            if (data.success) {
                console.log("로그인에 성공하셨습니다");
                navigate('/myPage');
            } else {
                setError('아이디 또는 비밀번호가 틀렸습니다.');
            }
        } catch (error) {
            // @ts-ignore
            setError(error.message);
            console.log("로그인에 실패했습니다");
        }
    };

    return (
        <>
            <div className="login-container">
                <form onSubmit={handleLogin}>
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
                            type="submit"
                        >
                            로그인
                        </button>
                        <button
                            className="signup-button"
                            type="button"
                            onClick={() => navigate('../createAccount')}
                        >
                            회원가입
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;