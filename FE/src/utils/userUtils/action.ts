import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export interface User {
    email: string;
    userName?: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
}

// 사용자 데이터를 localStorage에서 가져오는 훅
export const useUser = (): User | null => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (userData && token) {
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
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user.email) {
        const tickets = localStorage.getItem('tickets');
        if (tickets) {
            localStorage.setItem(`tickets_${user.email}`, tickets);
        }
    }

    localStorage.removeItem('token'); // 토큰 삭제
    localStorage.removeItem('user'); // 유저 정보 삭제
    localStorage.removeItem('tickets'); // 현재 세션의 티켓 정보 삭제

    navigate('/login'); // 로그인 페이지로 리다이렉트
};

// 로컬스토리지에서 사용자 정보를 가져오는 함수
export const fetchUserInfoFromLocalStorage = () => {
    try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (!token) {
            throw new Error('No token found');
        }

        if (!user) {
            throw new Error('No user data found');
        }

        const parsedUser = JSON.parse(user);
        console.log('Token:', token);
        console.log('User info:', parsedUser);

    } catch (error) {
        console.error('Error fetching user info from localStorage:', error);
    }
};
