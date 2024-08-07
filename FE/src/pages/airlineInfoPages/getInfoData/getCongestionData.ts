import axios from "axios";

const BASE_URL = "api2/B551177/PassengerNoticeKR/getfPassengerNoticeIKR";

const API_SETVICE_KEY = process.env.REACT_APP_AIRPORT_SERVICE_KEY;

/** 출입국 현황 api를 불러옵니다 */

export const fetchCongestionData = async (type: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?serviceKey=${API_SETVICE_KEY}${type}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to fetch congestion data", error);
    throw error;
  }
};
