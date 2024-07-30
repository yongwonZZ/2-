import React, { useCallback, useEffect, useMemo, useState } from "react";
import ExRateHeaderItem from "./Components/ExRateHeaderItem";
import "./Styles/ExchangeRatePage.css";
import SelectedCountry from "./Components/SelectedCountry";
import InputAmount from "./Components/InputAmount";
import { fetchExchangeRate } from "./getExchangeRates";
import Header from "../publicComponents/Header";
import Navbar from "../publicComponents/Navbar";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

interface ExchangeRate {
  cur_unit: string;
  cur_nm: string;
  deal_bas_r: string;
}

const ExchangeRatePage = () => {
  const [amount, setAmount] = useState<number>(0);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [baseCountry, setBaseCountry] = useState<ExchangeRate | null>(null);
  const [targetCountry, setTargetCountry] = useState<ExchangeRate | null>(null);
  const [isToggle, setIsToggle] = useState<boolean>(false);

  // 기본 통화 목록
  const defaultCurrencies = ["USD", "JPY(100)", "EUR", "CNH"];

  /** 하루 특정 시간에 따라 api 업데이트 */
  /** 현재 시간을 반환 */
  const getCurrentTime = () => {
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
    const date = String(now.getDate()).padStart(2, "0");
    return `${year}${month}${date}`;
  };
  const searchdate = getCurrentTime(); // 검색요청 날짜

  const type = "AP01"; // 환율 데이터 요청타입 AP01 = json

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rates = await fetchExchangeRate(searchdate, type);
        setExchangeRates(rates);

        // KRW와 USD의 환율 데이터를 설정 => default state
        const krwRate = rates.find((rate) => rate.cur_unit === "KRW");
        const usdRate = rates.find((rate) => rate.cur_unit === "USD");

        if (krwRate) setBaseCountry(krwRate);
        if (usdRate) setTargetCountry(usdRate);
      } catch (error) {
        console.error("Failed to fetch exchange rates", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(exchangeRates);
  }, [exchangeRates]);

  /**기본 통화 목록에 있는 환율만 필터링 */
  const defaultRates = useMemo(
    () =>
      exchangeRates.filter((rate) => defaultCurrencies.includes(rate.cur_unit)),
    [exchangeRates]
  );

  /** baseCountry와 targetCountry를 스왑합니다 */
  const handleSwapCountries = useCallback(() => {
    setBaseCountry(targetCountry);
    setTargetCountry(baseCountry);
  }, [baseCountry, targetCountry]);

  return isToggle ? (
    <>
      <div className="container">
        <Header
          leftContent={
            <div className="exchange-header">
              <FaChevronLeft
                style={{ fontSize: "22px" }}
                onClick={() => setIsToggle(false)}
              />
              통화
            </div>
          }
        />
        <div className="country-list">
          {exchangeRates?.map((item, index) => (
            <div className="country-item" key={index}>
              <div className="country-item-header">
                <div className="country-image"></div>
                <div className="country-name">{item.cur_nm.split(" ")[0]}</div>
              </div>
              <div className="country-amount">{item.cur_unit}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <div className="container">
      <Header leftContent={<div className="exchange-header">환율</div>} />
      <div className="last-update">
        마지막 업데이트 <span className="">{`2024.07.22 14:26`}</span>
      </div>
      <div className="ex-rate-list">
        {defaultRates
          ? defaultRates.map((rate) => (
              <ExRateHeaderItem
                key={rate.cur_unit}
                curUnit={rate.cur_unit}
                dealBasR={rate.deal_bas_r}
              />
            ))
          : defaultCurrencies.map((item, index) => (
              <ExRateHeaderItem curUnit={item} dealBasR="..." />
            ))}
      </div>
      {/* state값에 따라 target설정 */}
      <div className="selected-list">
        {/* base country */}
        {baseCountry ? (
          <div onClick={() => setIsToggle(true)}>
            <SelectedCountry type="base" amount={amount} {...baseCountry} />
          </div>
        ) : (
          <div className="country-item">
            <div className="country-item-header">
              <div className="country-image"></div>
              <div className="country-name">데이터를 불러오는 중입니다</div>
            </div>
          </div>
        )}
        {/* target country */}
        {targetCountry ? (
          <div onClick={() => setIsToggle(true)}>
            <SelectedCountry type="target" amount={amount} {...targetCountry} />
          </div>
        ) : (
          <div className="country-item">
            <div className="country-item-header">
              <div className="country-image"></div>
              <div className="country-name">데이터를 불러오는 중입니다</div>
            </div>
          </div>
        )}
      </div>
      <InputAmount
        setAmount={setAmount}
        onSwapCountries={handleSwapCountries}
      />
    </div>
  );
};

export default ExchangeRatePage;
