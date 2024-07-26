import axios from "axios";
import { searchResultType } from "../search-result-type";

/** .env로 옮겨야 함 */
const AIRLINE_SERVICE_KEY =
  "sfNylwxNbWCfF7pGVXv/TgNBbxQOU5480gsoaoJZF6bFnCgKolS4uI6KEpMOBOwx6TRtMCVFUslJdIEkr8ik4A==";
const AIRLINE_SERVICE_URL =
  "https://apis.data.go.kr/B551177/StatusOfPassengerFlightsDSOdp/getPassengerArrivalsDSOdp";

/** API 요청 함수 */
export const fetchAirlineData = async (
  params: any
): Promise<searchResultType[]> => {
  const { data } = await axios.get(AIRLINE_SERVICE_URL!, {
    params: {
      ...params,
      serviceKey: AIRLINE_SERVICE_KEY!,
      type: "json",
    },
  });

  // 응답결과가 {response: {body: {items: []}}} 구조로 래핑되어 있음
  return data.response.body.items;
};
