import axios from "axios";
import { searchResultType } from "../search-result-type";

const AIRLINE_KEY = process.env.REACT_APP_AIRLINE_SERVICE_KEY;
const AIRLINE_URL = process.env.REACT_APP_AIRLINE_SERVICE_URL;

const ARRIVAL_ENDPOINT = process.env.REACT_APP_AIRLINE_ARRIVAL_ENDPOINT;
const DEPARTURE_ENDPOINT = process.env.REACT_APP_AIRLINE_DEPARTURE_ENDPOINT;

/** API 요청 함수 */
export const fetchAirlineData = async (
  params: any
): Promise<searchResultType[]> => {
  // Promise.all <= 모든 프로미스의 결과를 기다림
  const [arrivalResponse, departureResponse] = await Promise.all([
    axios.get(`${AIRLINE_URL}${ARRIVAL_ENDPOINT}`!, {
      params: {
        ...params,
        serviceKey: AIRLINE_KEY,
        type: "json",
      },
    }),
    axios.get(`${AIRLINE_URL}${DEPARTURE_ENDPOINT}`!, {
      params: {
        ...params,
        serviceKey: AIRLINE_KEY,
        type: "json",
      },
    }),
  ]);

  // 응답결과가 {response: {body: {items: []}}} 구조로 래핑되어 있음
  const arrivalData = arrivalResponse.data.response.body.items;
  const departureData = departureResponse.data.response.body.items;
  const compositeData = [...arrivalData, ...departureData];

  return compositeData;
};
