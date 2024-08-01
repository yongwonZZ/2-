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
        // 서버에 로그인 요청을 보냄
        const response = await axios.post('http://localhost:5000/api/login', { email, password });
        return response.data;
    } catch (error: any) {
        // 에러 발생 시 에러 메시지를 처리
        if (error.response) {
            // 서버에서 반환한 에러 메시지 처리
            throw new Error(error.response.data.message || 'Unknown error occurred');
        } else if (error.request) {
            // 요청이 만들어졌으나 서버가 응답하지 않았을 때
            throw new Error('No response received from the server');
        } else {
            // 요청을 설정하는 과정에서 발생한 에러
            throw new Error('Error setting up the request');
        }
    }
};
