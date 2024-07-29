import axios from "axios";

const API_KEY =
  "hrMnQ33YKrJu8DOo5oq4CzNqxtaB8fucRisDvWoHIghiUdUd8e7LRhNVXccEa4aGXrCEb%2BN0l3q0X9JQoTstsg%3D%3D";
const BASE_URL = "api2/B551177/PassengerNoticeKR/getfPassengerNoticeIKR";

/** 출입국 현황 api를 불러옵니다 */

export const fetchCongestionData = async (type: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?serviceKey=${API_KEY}${type}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to fetch congestion data", error);
    throw error;
  }
};
