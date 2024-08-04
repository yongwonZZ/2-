import { useEffect, useState, useCallback } from "react";
import { searchResultType } from "../pages/airlinePage/airlineSearchComponents/searchResultType";

/** 로드 당 데이터 수 */
const DATA_PER_LOAD = 20;

export const useInfiniteScroll = (
  initialData: searchResultType[],
  ref: React.RefObject<HTMLDivElement>
) => {
  const [isLoading, setisLoading] = useState(false); // 로딩 상태
  const [data, setData] = useState<searchResultType[]>([]); // 현재까지 렌더링된 데이터

  useEffect(() => {
    setData(initialData.slice(0, DATA_PER_LOAD)); // 최초 렌더링 시 보여줄 데이터 수만큼 slice
  }, [initialData]);

  /** 추가 데이터를 더 로드하는 함수 */
  const loadMoreData = useCallback(() => {
    setisLoading(true); // 로딩 시작

    setTimeout(() => {
      const updatedData = initialData.slice(0, data.length + DATA_PER_LOAD); // 기존 데이터 + 로드 당 데이터 추가
      setData(updatedData);
      setisLoading(false); // 로딩 끝
    }, 500); // 500ms 의도적 지연
  }, [data.length, initialData]);

  useEffect(() => {
    const container = ref.current;

    if (!container) return;

    const options = {
      rootMargin: "0px",
      threshold: 1,
    };

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      // 지점이 교차되고 있고 && 원본 배열의 길이를 넘지 않았을 때만 실행되도록 조건문 추가
      if (target.isIntersecting && data.length < initialData.length) {
        loadMoreData();
      }
    };

    const observer = new IntersectionObserver(handleObserver, options); // 콜백함수와 옵션 넣어주기

    if (container) {
      observer.observe(container); // Intersection Observer를 div에 연결
    }

    return () => {
      if (container) {
        observer.unobserve(container); // 컴포넌트가 언마운트되면 Observer 해제
      }
    };
  }, [data, initialData.length, loadMoreData, ref]);

  return { data, isLoading };
};
