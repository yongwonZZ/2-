
import axios from 'axios';

//만약에 로컬 서버로 돌릴경우 localhost:POST로 사용한다
//실행주소가 localhost:5000이렇게 돌고있으니 이걸 URL로 설정
const API_URL = 'http://localhost:5000';

//post 적을때 주소 포스트맨에 정의된 주소랑 맞는지 반드시 확인하자
export const createAccount = async (userData: any) => {
    try {
        const response = await axios.post(`${API_URL}/api/signup`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create account');
    }
};
