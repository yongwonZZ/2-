import React, { useCallback, useEffect, useMemo, useState } from "react";
import ExRateHeaderItem from "../../pages/exchangeRatePage/components/ExRateHeaderItem";
import styles from "../../styles/exchangeRatePage/ExchangeRatePage.module.css";
import SelectedCountry from "../../pages/exchangeRatePage/components/SelectedCountry";
import InputAmount from "../../pages/exchangeRatePage/components/InputAmount";
import {
  fetchExchangeRate,
  fetchCountryImage,
} from "../../pages/exchangeRatePage/getExchangeRates";
import Header from "../../components/Header";
import { FaChevronLeft } from "react-icons/fa";
import countryNameMapping from "./countryNameMapping";

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
  const [isBase, setIsBase] = useState<boolean>(false);
  const [countryImages, setCountryImages] = useState<{ [key: string]: string }>(
    {}
  );

  const defaultCurrencies = ["USD", "JPY(100)", "EUR", "CNH"];

  const getCurrentTime = () => {
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const date = String(now.getDate()).padStart(2, "0");
    return `${year}.${month}.${date}`;
  };

  const searchdate = getCurrentTime().split(".").join("");
  const type = "AP01";

  useEffect(() => {
    const fetchExchangeRatesAndImages = async () => {
      try {
        const rates = await fetchExchangeRate(searchdate, type);
        setExchangeRates(rates);

        const krwRate = rates.find((rate) => rate.cur_unit === "KRW");
        const usdRate = rates.find((rate) => rate.cur_unit === "USD");

        if (krwRate) setBaseCountry(krwRate);
        if (usdRate) setTargetCountry(usdRate);

        const countryImagesTemp: { [key: string]: string } = {};

        await Promise.all(
          rates.map(async (rate) => {
            const countryName = rate.cur_nm.split(" ")[0];
            const mappedCountryName =
              countryNameMapping[countryName] || countryName;

            const flagUrl = await fetchCountryImage(mappedCountryName);
            countryImagesTemp[rate.cur_unit] = flagUrl;
          })
        );

        setCountryImages(countryImagesTemp);
      } catch (error) {
        console.error("Failed to fetch exchange rates", error);
      }
    };

    fetchExchangeRatesAndImages();
  }, [searchdate, type]);

  const defaultRates = useMemo(
    () =>
      exchangeRates.filter((rate) => defaultCurrencies.includes(rate.cur_unit)),
    [exchangeRates]
  );

  const handleSwapCountries = useCallback(() => {
    setBaseCountry(targetCountry);
    setTargetCountry(baseCountry);
  }, [baseCountry, targetCountry]);

  const handleSelectCountry = useCallback(
    (item: ExchangeRate) => {
      if (isBase) {
        setBaseCountry(item);
      } else {
        setTargetCountry(item);
      }
      setIsToggle(false);
    },
    [isBase]
  );

  return isToggle ? (
    <div className={styles.container}>
      <Header
        leftContent={
          <div className={styles["exchange-header"]}>
            <FaChevronLeft
              style={{ fontSize: "22px" }}
              onClick={() => setIsToggle(false)}
            />
            통화
          </div>
        }
      />
      <div className={styles["country-list"]}>
        {exchangeRates.map((item, index) => (
          <div
            className={styles["country-item"]}
            key={index}
            onClick={() => handleSelectCountry(item)}
          >
            <div className={styles["country-item-header"]}>
              <div className={styles["country-image"]}>
                {countryImages[item.cur_unit] && (
                  <img
                    className={styles.flag}
                    src={countryImages[item.cur_unit]}
                    alt={item.cur_nm}
                  />
                )}
              </div>
              <div className={styles["country-name"]}>
                {item.cur_nm.split(" ")[0]}
              </div>
            </div>
            <div className={styles["country-amount"]}>{item.cur_unit}</div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <Header
        leftContent={<div className={styles["exchange-header"]}>환율</div>}
      />
      <div className={styles["last-update"]}>
        마지막 업데이트 <span className="">{`${getCurrentTime()} 14:26`}</span>
      </div>
      <div className={styles["ex-rate-list"]}>
        {defaultRates.length > 0
          ? defaultRates.map((rate) => (
              <ExRateHeaderItem
                key={rate.cur_unit}
                curUnit={rate.cur_unit}
                dealBasR={rate.deal_bas_r}
              />
            ))
          : defaultCurrencies.map((item) => (
              <ExRateHeaderItem key={item} curUnit={item} dealBasR="..." />
            ))}
      </div>
      <div className={styles["selected-list"]}>
        {baseCountry ? (
          <div
            onClick={() => {
              setIsBase(true);
              setIsToggle(true);
            }}
          >
            <SelectedCountry
              type="base"
              amount={amount}
              baseCountry={baseCountry ?? undefined}
              countryImage={countryImages[baseCountry.cur_unit]}
            />
          </div>
        ) : (
          <div className={styles["country-item"]}>
            <div className={styles["country-item-header"]}>
              <div className={styles["country-image"]}></div>
              <div className={styles["country-name"]}>
                데이터를 불러오는 중입니다
              </div>
            </div>
          </div>
        )}
        {targetCountry ? (
          <div
            onClick={() => {
              setIsBase(false);
              setIsToggle(true);
            }}
          >
            <SelectedCountry
              type="target"
              amount={amount}
              baseCountry={baseCountry ?? undefined}
              targetCountry={targetCountry ?? undefined}
              countryImage={countryImages[targetCountry.cur_unit]}
            />
          </div>
        ) : (
          <div className={styles["country-item"]}>
            <div className={styles["country-item-header"]}>
              <div className={styles["country-image"]}></div>
              <div className={styles["country-name"]}>
                데이터를 불러오는 중입니다
              </div>
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
