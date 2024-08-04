import axios from "axios";

interface ExchangeRate {
  cur_unit: string;
  cur_nm: string;
  deal_bas_r: string;
}

const API_KEY = "bWOoBRWFOt3fRCMfTgMmcoeW2LvN8jWV"; // 발급받은 인증키
const BASE_URL = "api1/site/program/financial/exchangeJSON";

export const fetchExchangeRate = async (
  searchdate: string,
  type: string
): Promise<ExchangeRate[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}?authkey=${API_KEY}&searchdate=${searchdate}&data=${type}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exchange rates", error);
    throw error;
  }
};

export const fetchCountryImage = async (country: string): Promise<string> => {
  try {
    const encodedCountry = encodeURIComponent(country);
    const response = await axios.get(`
      http://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=hrMnQ33YKrJu8DOo5oq4CzNqxtaB8fucRisDvWoHIghiUdUd8e7LRhNVXccEa4aGXrCEb%2BN0l3q0X9JQoTstsg%3D%3D&pageNo=1&numOfRows=10&cond[country_nm::EQ]=${encodedCountry}`);
    // API 응답에서 이미지 URL 추출
    const flagUrl = response.data.data[0]?.download_url;
    return flagUrl || "";
  } catch (error) {
    console.error("Failed to fetch country image", error);
    throw error;
  }
};
