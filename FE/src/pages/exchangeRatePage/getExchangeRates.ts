import axios from "axios";

interface ExchangeRate {
  cur_unit: string;
  cur_nm: string;
  deal_bas_r: string;
}

const API_KEY = process.env.REACT_APP_EXCHANGE_SERVICE_KEY; // 발급받은 인증키
const BASE_URL = "api1/site/program/financial/exchangeJSON";

export const fetchExchangeRate = async (
  searchdate: string,
  type: string
): Promise<ExchangeRate[]> => {
  try {
    console.log(`Fetching exchange rates for ${searchdate}`);
    const response = await axios.get(
      `${BASE_URL}?authkey=${API_KEY}&searchdate=${searchdate}&data=AP01`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exchange rates");
    throw error;
  }
};

const COUNTRY_URL = process.env.REACT_APP_COUNTRY_URL;
const COUNTRY_SETVICE_KEY = process.env.REACT_APP_COUNTRY_SERVICE_KEY;

export const fetchCountryImage = async (country: string): Promise<string> => {
  try {
    const encodedCountry = encodeURIComponent(country);
    console.log(`Fetching image for country: ${country}`);
    const response = await axios.get(
      `${COUNTRY_URL}?serviceKey=${COUNTRY_SETVICE_KEY}&pageNo=1&numOfRows=10&cond[country_nm::EQ]=${encodedCountry}`
    );
    // API 응답에서 이미지 URL 추출
    const flagUrl = response.data.data[0]?.download_url;
    return flagUrl || "";
  } catch (error) {
    console.error("Failed to fetch country image");
    throw error;
  }
};
