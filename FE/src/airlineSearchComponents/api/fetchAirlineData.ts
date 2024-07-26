import axios from "axios";
import { searchResultType } from "../search-result-type";

/** .env로 옮겨야 함 */
const AIRLINE_SERVICE_KEY = process.env.REACT_APP_AIRLINE_SERVICE_KEY;
const AIRLINE_SERVICE_URL = process.env.REACT_APP_AIRLINE_SERVICE_URL;

/** API 요청 함수 */
export const fetchAirlineData = async (
  params: any
): Promise<searchResultType[]> => {
  console.log("api_url", AIRLINE_SERVICE_URL);
  console.log("api_key", AIRLINE_SERVICE_KEY);

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
