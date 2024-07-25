import { useParams } from "react-router-dom";
import { useFetchAirlineData } from "../airlineSearchComponents/hooks/useFetchAirlineData";

function AirlineDetailPage() {
  /** flightId 소문자 형식 */
  let { id } = useParams();
  /** flightId 대문자 형식으로 */
  id = id?.toUpperCase();

  /** data fetching */
  const { data } = useFetchAirlineData({});

  /** 자료에서 flightId에 해당하는 특정 항공편 하나 찾기 */
  const detailData = data?.find(({ flightId }) => flightId === id);

  return <h1>{detailData?.estimatedDateTime}</h1>;
}

export default AirlineDetailPage;
