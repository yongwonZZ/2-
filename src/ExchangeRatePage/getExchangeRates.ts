// api.ts
import axios from "axios";

const API_KEY = "bWOoBRWFOt3fRCMfTgMmcoeW2LvN8jWV"; // 발급받은 인증키
const BASE_URL =
  "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON";

interface ExchangeRate {
  cur_unit: string;
  cur_nm: string;
  deal_bas_r: string;
}

export const fetchExchangeRate = async (
  searchdate: string,
  type: string
): Promise<ExchangeRate[]> => {
  try {
    const response = await axios.get(
      `/site/program/financial/exchangeJSON?authkey=${API_KEY}&searchdate=${searchdate}&data=${type}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exchange rates", error);
    throw error;
  }
};
