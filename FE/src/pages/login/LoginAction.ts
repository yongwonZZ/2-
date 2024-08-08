import axios from 'axios';

export interface LoginResponse {
    message: string;
    token: string;
    user: {
        email: string;
        nickname?: string;
    };
}

// 로그인 요청을 보내는 함수
export const LoginAction = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const baseURL = process.env.REACT_APP_API_URL;
        console.log('Base URL:', baseURL); // 콘솔에 출력하여 확인
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });
        console.log('Server response data:', response.data); // 서버 응답 데이터를 콘솔에 출력
        return response.data;

    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || '아이디 또는 비밀번호를 확인해주세요');
        } else if (error.request) {
            throw new Error('No response received from the server');
        } else {
            throw new Error('Error setting up the request');
        }
    }
};
