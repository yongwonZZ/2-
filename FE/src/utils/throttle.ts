/** scroll 이벤트, 무한 스크롤 구현 등에 유용 */
export default function throttle<T extends (...args: any[]) => void>(
  callback: T, // ms 주기마다 실행할 함수
  ms: number // 주기시간 [ms]
): (...args: Parameters<T>) => void {
  let lastFunc: NodeJS.Timeout | null = null;
  let lastRan: number | null = null;

  return function (...args: Parameters<T>) {
    if (lastRan === null || Date.now() - lastRan >= ms) {
      callback(...args);
      lastRan = Date.now();
    } else {
      if (lastFunc !== null) {
        clearTimeout(lastFunc);
      }

      lastFunc = setTimeout(() => {
        if (lastRan !== null && Date.now() - lastRan >= ms) {
          callback(...args);
          lastRan = Date.now();
        }
      }, ms - (Date.now() - (lastRan || 0)));
    }
  };
}

/** 사용 예시 */
// const log = (message: string) => console.log(message);

// 아래처럼 throttle 함수로 감싸기!
// const log = throttle((message: string) => console.log(message), 300);

// throttledLog("Hello");
// throttledLog("Hello again");
// "Hello"만 로그에 출력됨 (1000ms 후에 "Hello again" 호출 가능)
