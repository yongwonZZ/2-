export const formatDateTime = (dateTime: string): string => {
    const year = dateTime.slice(0, 4);
    const month = dateTime.slice(4, 6);
    const day = dateTime.slice(6, 8);
    const hour = dateTime.slice(8, 10);
    const minute = dateTime.slice(10, 12);

    // Date 객체 생성
    const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);

    // 요일 배열
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[date.getDay()]; // 요일 가져오기

    return `${year}년 ${month}월 ${day}일 (${dayOfWeek}) ${hour}시 ${minute}분`;
};