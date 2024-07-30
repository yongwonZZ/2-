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

/** 타임스탬프 => ex. "마지막 업데이트 ❇️ 오후 1:57:30" */
/** API가 업데이트된 시각이 필요하실 때 사용하세요 */
export function lastUpdatedTime(timestamp: number) {
  const updatedTime = new Date(timestamp);
  return `마지막 업데이트 시각: ${updatedTime.toLocaleTimeString()}`;
}
