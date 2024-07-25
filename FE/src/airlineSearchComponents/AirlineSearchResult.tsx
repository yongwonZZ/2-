import axios from "axios";
import { useQuery } from "react-query";
import { searchResultType } from "./search-result-type";

/** API 인증키 => 나중에 .env로 옮겨야 함 */
const AIRLINE_SERVICE_KEY =
  "sfNylwxNbWCfF7pGVXv/TgNBbxQOU5480gsoaoJZF6bFnCgKolS4uI6KEpMOBOnpwx6TRtMCVFUslJdIEkr8ik4A==";

/** API 요청 주소 => 나중에 .env로 옮겨야 함 */
/** Encoding이 아닌 Decoding 인증키 사용 */
const AIRLINE_SERVICE_URL =
  "https://apis.data.go.kr/B551177/StatusOfPassengerFlightsDSOdp/getPassengerArrivalsDSOdp";

/** API 요청 함수 */
const fetchAirlineData = async (
  params: Record<string, string>
): Promise<searchResultType[]> => {
  const { data } = await axios.get(AIRLINE_SERVICE_URL, {
    params,
  });

  // 응답결과가 {response: {body: {items: []}}} 구조로 래핑되어 있음
  return data.response.body.items;
};

/** useQuery 커스텀 훅 */
const useFetchAirlineData = (params: Record<string, string>) => {
  return useQuery<searchResultType[], Error>(["airlineData", params], () =>
    fetchAirlineData(params)
  );
};

function AirlineSearchResult() {
  /** 요청에 필요한 파라미터 */
  /** 원래는 AirlineSearchPage로부터 props 전송받아야 함. 일단 하드코딩 */
  const params = {
    // airport_code: "IAD",
    type: "json",
    serviceKey: AIRLINE_SERVICE_KEY,
  };

  const { error, isLoading, data } = useFetchAirlineData(params);

  return (
    <div>
      <h1>검색 결과</h1>
      <div>
        {isLoading && <div>데이터를 불러오는 중이에요..!</div>}
        {error && <div>에러: {error.message}</div>}
        {data?.slice(0, 10).map((item: searchResultType, index: number) => {
          return (
            <li key={index} style={{ marginBottom: 24, fontSize: 16 }}>
              <p>항공사: {item.airline}</p>
              <p>편명: {item.flightId}</p>
              <p>도착 예정시각: {item.scheduleDateTime}</p>
              <p>도착 예상시각(지연 시): {item.estimatedDateTime}</p>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default AirlineSearchResult;
