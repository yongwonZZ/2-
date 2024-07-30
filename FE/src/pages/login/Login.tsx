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
            console.log('Login response data:', data); // 응답 데이터 로깅

            // 응답 데이터의 구조를 기반으로 성공 여부를 판단합니다.
            if (data && data.success) {
                console.log("로그인에 성공하셨습니다");
                navigate('/myPage');
            } else {
                // 실패했을 때의 응답 데이터와 메시지를 로깅합니다.
                console.error('Login failed response:', data);
                setError('아이디 또는 비밀번호가 틀렸습니다.');
            }
        } catch (error : any) {
            // @ts-ignore
            console.error('Login error:', error);
            setError(error.message || '로그인 중 오류가 발생했습니다.');
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
                        autoComplete="username" // 추가된 속성
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
                        autoComplete="current-password" // 추가된 속성
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