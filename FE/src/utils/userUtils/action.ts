//마이페이지 엑션
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// User 인터페이스 정의
interface User {
    email: string;
    nickname?: string;
}

// 사용자 데이터를 localStorage에서 가져오는 훅
export const useUser = (): User | null => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } catch (e) {
                console.error('Failed to parse user data from localStorage', e);
                setUser(null); // JSON 파싱에 실패하면 user를 null로 설정
            }
        } else {
            console.warn('No user data found in localStorage');
            setUser(null); // user 데이터가 없으면 null로 설정
        }
    }, []);

    return user;
}

// 로그아웃 기능을 처리하는 함수
export const handleLogout = (navigate: ReturnType<typeof useNavigate>) => {
    localStorage.removeItem('user'); // localStorage에서 user 데이터 제거
    navigate('/login'); // 로그인 페이지로 리다이렉트
};
