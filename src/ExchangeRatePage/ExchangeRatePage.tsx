import React, { useEffect, useState } from "react";
import ExRateHeaderItem from "./Components/ExRateHeaderItem";
import "./Styles/ExchangeRatePage.css";
import SelectedCountry from "./Components/SelectedCountry";
import InputAmount from "./Components/InputAmount";
import { fetchExchangeRate } from "./getExchangeRates";

interface ExchangeRate {
  cur_unit: string;
  cur_nm: string;
  deal_bas_r: string;
}

const ExchangeRatePage = () => {
  const [amount, setAmount] = useState<number>(0);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [baseCountry, setBaseCountry] = useState();
  const [targetCountry, setTargetCountry] = useState();

  // 기본 통화 목록
  const defaultCurrencies = ["USD", "JPY(100)", "EUR", "CNH"];

  /** 하루 특정 시간에 따라 api 업데이트 */
  const searchdate = "20240722"; // 검색요청 날짜
  const type = "AP01"; // 환율 데이터 요청타입

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rates = await fetchExchangeRate(searchdate, type);
        setExchangeRates(rates);
      } catch (error) {
        console.error("Failed to fetch exchange rates", error);
      }
    };
    console.log(exchangeRates);
    fetchData();
  }, []);

  /**기본 통화 목록에 있는 환율만 필터링 */
  const defaultRates = exchangeRates?.filter((rate) =>
    defaultCurrencies.includes(rate.cur_unit)
  );

  return (
    <div className="container">
      <div className="last-update">
        마지막 업데이트 <span className="">{`2024.07.22 14:26`}</span>
      </div>
      <div className="ex-rate-list">
        {defaultRates.map((rate) => (
          <ExRateHeaderItem
            key={rate.cur_unit}
            curUnit={rate.cur_unit}
            dealBasR={rate.deal_bas_r}
          />
        ))}
      </div>
      {/* state값에 따라 target설정 */}
      <div className="selected-list">
        {/* base country */}
        <SelectedCountry amount={amount} />
        {/* target country */}
        <SelectedCountry amount={0} />
      </div>
      <InputAmount setAmount={setAmount} />
    </div>
  );
};

export default ExchangeRatePage;
