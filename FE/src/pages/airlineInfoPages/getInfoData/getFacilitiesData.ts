import axios from "axios";

const API_KEY = process.env.REACT_APP_AIRPORT_SERVICE_KEY;
const BASE_URL = "api2/B551177/StatusOfFacility/getFacilityKR";

/** 편의시설 api를 불러옵니다. */
// 로컬 환경에서의 프록시 설정 배포와 다르게 구성해야합니다
export const fetchFacilitiesData = async (type: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?serviceKey=${API_KEY}${type}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch facility data", error);
    throw error;
  }
};
