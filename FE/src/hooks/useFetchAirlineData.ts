import { useQuery } from "react-query";
import { fetchAirlineData } from "../pages/airlinePage/airlineSearchComponents/api/fetchAirlineData";
import { searchResultType } from "../pages/airlinePage/airlineSearchComponents/search-result-type";

/** useQuery 커스텀 훅 */
export const useFetchAirlineData = (params: any) => {
  return useQuery<searchResultType[], Error>(
    ["airlineData", params],
    () => fetchAirlineData(params),
    { staleTime: 60 * 1000 } // fetch 이후 1분 동안은 cache 이용
  );
};
