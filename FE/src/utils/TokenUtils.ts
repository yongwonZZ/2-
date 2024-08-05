//토큰정보 확인하는 함수
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
};