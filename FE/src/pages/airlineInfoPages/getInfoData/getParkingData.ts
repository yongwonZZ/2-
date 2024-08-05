import axios from "axios";

const BASE_URL = "api2/B551177/StatusOfParking/getTrackingParking";
const API_KEY = process.env.REACT_APP_AIRPORT_SERVICE_KEY;
/** 주차정보 api를 불러옵니다 */
export const fetchParkingData = async (type: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?serviceKey=${API_KEY}${type}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch parking data", error);
    throw error;
  }
};
