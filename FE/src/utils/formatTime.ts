/** API 시간(string 타입) => HH:MM 형식으로 변환 */
export function formatTime(time: string) {
  const HH = time.slice(8, 10);
  const MM = time.slice(10, 12);

  return `${HH}:${MM}`;
}

/** 현재 시각 => YYYYMMDDHHmm */
export function currentFormatTime(): string {
  const now = new Date();
  const YYYY = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const DD = String(now.getDate()).padStart(2, "0");
  const HH = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");

  return `${YYYY}${MM}${DD}${HH}${mm}`;
}

/** 타임스탬프 => ex. "마지막 업데이트: 오후 1:57:30" */
/** API가 업데이트된 시각이 필요하실 때 사용하세요 */
export function lastUpdatedTime(timestamp: number) {
  const updatedTime = new Date(timestamp);
  return `마지막 업데이트: ${updatedTime.toLocaleTimeString()}`;
}

/** YYYYMMDDHHMM => ex. 8월 3일 (토) */
/** 날짜문자열(YYYYMMDDHHMM)을 월/일/요일 string으로 변환하는 함수 */
export function formatDateString(dateString: string) {
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10) - 1; // 월은 0부터 시작하므로 -1
  const day = parseInt(dateString.substring(6, 8), 10);
  const hour = parseInt(dateString.substring(8, 10), 10);
  const minute = parseInt(dateString.substring(10, 12), 10);

  // Date 객체 생성
  const date = new Date(year, month, day, hour, minute);

  // 월과 요일 배열
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  // 월, 일, 요일 추출
  const formattedMonth = months[date.getMonth()];
  const formattedDay = date.getDate();
  const formattedDayOfWeek = days[date.getDay()];

  // 포맷팅된 문자열 반환
  return `${formattedMonth} ${formattedDay}일 (${formattedDayOfWeek})`;
}
