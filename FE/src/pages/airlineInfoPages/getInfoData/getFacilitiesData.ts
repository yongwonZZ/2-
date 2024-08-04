import axios from "axios";

// http://apis.data.go.kr/B551177/StatusOfFacility/getFacilityEN

const API_KEY =
  "hrMnQ33YKrJu8DOo5oq4CzNqxtaB8fucRisDvWoHIghiUdUd8e7LRhNVXccEa4aGXrCEb%2BN0l3q0X9JQoTstsg%3D%3D";
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
