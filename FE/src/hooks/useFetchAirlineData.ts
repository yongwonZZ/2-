import { useQuery } from "react-query";
import { fetchAirlineData } from "../pages/airlineSearchComponents/api/fetchAirlineData";
import { searchResultType } from "../pages/airlineSearchComponents/search-result-type";

/** useQuery 커스텀 훅 */
export const useFetchAirlineData = (params: any) => {
  return useQuery<searchResultType[], Error>(["airlineData", params], () =>
    fetchAirlineData(params)
  );
};
