import { useState, useEffect } from "react";
import { searchResultType } from "./searchResultType";
import AirlineSearchResultCard from "./AirlineSearchResultCard";
import { currentFormatTime } from "../../../utils/formatTime";

type AirlineSearchResultProps = {
  data?: searchResultType[];
  isLoading: boolean;
  error?: Error;
};

/** 한 페이지 당 데이터 수 */
const DATA_PER_PAGE = 20;

/** 디바운스 함수 */
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

function AirlineSearchResult({
  data,
  isLoading,
  error,
}: AirlineSearchResultProps) {
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<searchResultType[]>([]);

  useEffect(() => {
    if (typeof data === "undefined") return; // data가 undefined일 가능성 있으므로 임시로 처리

    // 다음 페이지 데이터
    const nextData = data
      .filter(
        ({ estimatedDateTime }) =>
          Number(estimatedDateTime) >= Number(currentFormatTime()) - 15
      )
      .sort(({ estimatedDateTime: a }, { estimatedDateTime: b }) => +a - +b)
      .slice(DATA_PER_PAGE * (page - 1), DATA_PER_PAGE * page);

    setPaginatedData((prevData) => [...prevData, ...nextData]);
  }, [data, page]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 200); // 200ms 디바운스 타임

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {isLoading && <div>데이터를 불러오는 중이에요..!</div>}
      {error && (
        <div>
          <p>데이터를 가져오는 데 실패했어요...</p>
          <p>에러 메시지: {error.message}</p>
        </div>
      )}
      {typeof data === "undefined" ? (
        <div>검색어를 입력해주세요!</div>
      ) : paginatedData.length === 0 ? (
        <div>
          <p>앗..! 검색 결과가 없습니다.</p>
          <p>다른 검색어를 입력하거나</p>
          <p>우측 상단의 검색어 필터를 확인해 보세요.</p>
        </div>
      ) : (
        paginatedData.map(
          (
            item: searchResultType,
            index: number,
            origin: searchResultType[]
          ) => (
            <AirlineSearchResultCard key={index} item={item}>
              {item.codeshare === "Slave" &&
              origin.find(
                ({ flightId }) => flightId === item.masterflightid
              ) ? (
                <AirlineSearchResultCard.Slave item={item} />
              ) : (
                <AirlineSearchResultCard.Master item={item} />
              )}
            </AirlineSearchResultCard>
          )
        )
      )}
    </div>
  );
}

export default AirlineSearchResult;
