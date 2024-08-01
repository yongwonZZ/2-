import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { LoginAction, LoginResponse } from './LoginAction';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const data: LoginResponse = await LoginAction(email, password);
            console.log('Login response data:', data);

            if (data.message && data.message.includes('환영합니다')) {
                console.log("로그인에 성공하셨습니다");
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('../myPage');
            } else {
                console.error('Login failed response:', data);
                setError('아이디 또는 비밀번호가 틀렸습니다.');
            }
        } catch (error: any) {
            setError(error.message || '로그인 중 오류가 발생했습니다.');
            console.error('Login error:', error);
            console.log("로그인에 실패했습니다");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            {isLoading && <LoadingSpinner message="테스트" />}
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
                    autoComplete="username"
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
                    autoComplete="current-password"
                />
                {error && <p className="error">{error}</p>}
                <div className="button-container">
                    <button className="login-button" type="submit">
                        로그인
                    </button>
                    <button className="signup-button" type="button" onClick={() => navigate('../createAccount')}>
                        회원가입
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
