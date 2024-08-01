import { useState, useEffect } from "react";
import { searchResultType } from "./searchResultType";
import AirlineSearchResultCard from "./AirlineSearchResultCard";
import { currentFormatTime } from "../../../utils/formatTime";

type AirlineSearchResultProps = {
  data?: searchResultType[];
  isLoading: boolean;
  error?: Error;
};

// 무한 스크롤 로직 구현 flow
// 0. data props로 부모 컴포넌트에서 필터된 data 전송받음 (데이터양: 0~7000여개)
// 1. useState => page 상태를 1로 두고, 스크롤이 끝까지 내려가면 1씩 증가
// 2. useState => paginatedData에 최초 마운트 시 20개의 데이터를 담고, page가 1씩 증가하면 추가로 20개 담기
// 3. 스크롤 이벤트 리스너를 달아서 스크롤이 맨 밑으로 내려가면 setPage, setPaginatedData 트리거

/** 한 페이지 당 데이터 수 */
const DATA_PER_PAGE = 20;

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
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

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
