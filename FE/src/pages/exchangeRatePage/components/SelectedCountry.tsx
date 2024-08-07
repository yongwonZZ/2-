import React, { useCallback } from "react";
import styles from "../../../styles/exchangeRatePage/SelectedCountry.module.css";

interface ExchangeRate {
  cur_unit: string;
  cur_nm: string;
  deal_bas_r: string;
}

interface SelectedCountryProps {
  type: "base" | "target";
  amount: number;
  baseCountry?: ExchangeRate;
  targetCountry?: ExchangeRate;
  countryImage?: string;
}

const SelectedCountry: React.FC<SelectedCountryProps> = ({
  type,
  amount,
  baseCountry,
  targetCountry,
  countryImage,
}) => {
  const currency = type === "base" ? baseCountry : targetCountry;
  const baseRate = baseCountry
    ? parseFloat(baseCountry.deal_bas_r.replace(/,/g, ""))
    : 1;
  const targetRate = targetCountry
    ? parseFloat(targetCountry.deal_bas_r.replace(/,/g, ""))
    : 1;

  // 환율 계산 로직
  const convertedAmount =
    type === "base" ? amount : amount * (baseRate / targetRate);

  // 숫자 포맷팅 함수
  const formatNumber = useCallback((num: number) => {
    return new Intl.NumberFormat("en-US", {
      // minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }, []);

  return (
    <div className={styles["country-item"]}>
      <div className={styles["country-item-header"]}>
        <div className={styles["country-image"]}>
          {countryImage && (
            <img
              className={styles.flag}
              src={countryImage}
              alt={`${currency?.cur_nm} flag`}
            />
          )}
        </div>
        <div className={styles["country-name"]}>{currency?.cur_nm.split(" ")[0]}</div>
      </div>
      <div className={styles.amount}>
        <h1 className={styles.rateAmount}>
          {/* {type === "base" ? amount : convertedAmount.toFixed(2)} */}
          {type === "base"
            ? formatNumber(amount)
            : formatNumber(convertedAmount)}
        </h1>
        <div className={styles.currencyUnit}>{currency?.cur_unit}</div>
      </div>
    </div>
  );
};

export default SelectedCountry;
