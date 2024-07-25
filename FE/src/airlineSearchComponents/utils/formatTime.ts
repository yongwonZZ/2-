export function formatTime(time: string) {
  const hr = time.slice(8, 10);
  const min = time.slice(10, 12);

  return `${hr}:${min}`;
}
