import axios from 'axios';

// 보호된 데이터를 가져오는 함수
export const getProtectedData = async () => {
    const token = localStorage.getItem('token'); // localStorage에서 JWT 가져오기
    if (!token) throw new Error('No token found'); // 토큰이 없으면 에러 발생

    try {
        // 서버에 인증된 요청 보내기
        const response = await axios.get('http://localhost:5000/api/protected', {
            headers: { Authorization: `Bearer ${token}` } // 요청 헤더에 토큰 포함
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching protected data:', error);
        throw error; // 에러 발생 시 에러 던지기
    }
};