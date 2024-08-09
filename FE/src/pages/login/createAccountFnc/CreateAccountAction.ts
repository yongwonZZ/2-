import axios from 'axios';

export interface CreateAccountResponse {
    message: string;
}

// 회원가입 요청을 보내는 함수
export const createAccount = async (data: any): Promise<CreateAccountResponse> => {
    try {
        const response = await axios.post(`${process.env.VM_REACT_APP_API_URL}/signup`, data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to create account');
        } else if (error.request) {
            throw new Error('No response received from the server');
        } else {
            throw new Error('Error setting up the request');
        }
    }
};