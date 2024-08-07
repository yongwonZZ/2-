/**
 * 대기시간 미만의 연속적인 이벤트 발생 시 마지막 이벤트 하나만 실행
 * @param callback 대기시간 이후 실행할 함수
 * @param ms 대기시간(단위: ms)
 */
export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  ms: number
) {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback.apply(context, args);
    }, ms);
  };
}
