export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token; // 토큰이 있으면 true, 없으면 false 반환
};