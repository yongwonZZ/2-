import axios from "axios";

const API_KEY =
  "hrMnQ33YKrJu8DOo5oq4CzNqxtaB8fucRisDvWoHIghiUdUd8e7LRhNVXccEa4aGXrCEb%2BN0l3q0X9JQoTstsg%3D%3D";
const BASE_URL =
  "https://apis.data.go.kr/B551177/StatusOfParking/getTrackingParking";

export const fetchParkingData = async (type: string) => {
  try {
    // const response = await axios.get(`${BASE_URL}&serviceKey=${API_KEY}`);
    const response = await axios.get(
      `/B551177/StatusOfParking/getTrackingParking?serviceKey=hrMnQ33YKrJu8DOo5oq4CzNqxtaB8fucRisDvWoHIghiUdUd8e7LRhNVXccEa4aGXrCEb%2BN0l3q0X9JQoTstsg%3D%3D&%`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch parking data", error);
    throw error;
  }
};
