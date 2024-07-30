import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { LoginAction, LoginResponse } from './LoginAction';

const Login = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션 훅

    const [email, setEmail] = useState<string>(''); // 이메일 상태
    const [password, setPassword] = useState<string>(''); // 비밀번호 상태
    const [error, setError] = useState<string>(''); // 에러 메시지 상태

    // 폼 제출 핸들러
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault(); // 폼 제출 기본 동작 막기
        try {
            const data: LoginResponse = await LoginAction(email, password); // 로그인 요청
            console.log('Login response data:', data); // 응답 데이터 로깅

            // 로그인 성공 여부 판단
            if (data.message && data.message.includes('환영합니다')) {
                console.log("로그인에 성공하셨습니다");
                localStorage.setItem('token', data.token); // JWT를 localStorage에 저장
                navigate('../myPage'); // 로그인 성공 후 페이지 이동
            } else {
                // 로그인 실패 시
                console.error('Login failed response:', data);
                setError('아이디 또는 비밀번호가 틀렸습니다.');
            }
        } catch (error: any) {
            // 에러 발생 시 에러 메시지 설정
            setError(error.message || '로그인 중 오류가 발생했습니다.');
            console.error('Login error:', error);
            console.log("로그인에 실패했습니다");
        }
    };

    return (
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
                {error && <p className="error">{error}</p>} {/* 에러 메시지 출력 */}
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
                        onClick={() => navigate('../createAccount')} // 회원가입 페이지로 이동
                    >
                        회원가입
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
