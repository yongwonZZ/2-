import axios from 'axios';

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:3000/api/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
};
