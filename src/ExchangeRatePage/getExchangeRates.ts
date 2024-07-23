import axios from "axios";

interface ExchangeRate {
  cur_unit: string;
  cur_nm: string;
  deal_bas_r: string;
}
const API_KEY = "bWOoBRWFOt3fRCMfTgMmcoeW2LvN8jWV"; // 발급받은 인증키
const BASE_URL =
  "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON";

export const fetchExchangeRate = async (
  searchdate: string,
  type: string
): Promise<ExchangeRate[]> => {
  try {
    // const response = await axios.get(
    //   `/site/program/financial/exchangeJSON?authkey=${API_KEY}&searchdate=${searchdate}&data=${type}`
    // );
    const response = await axios.get(
      `/api1/site/program/financial/exchangeJSON?authkey=${API_KEY}&searchdate=${searchdate}&data=${type}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exchange rates", error);
    throw error;
  }
};
