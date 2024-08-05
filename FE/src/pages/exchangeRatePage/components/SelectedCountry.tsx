import React from "react";
import "../styles/SelectedCountry.css";

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

  return (
    <div className="country-item">
      <div className="country-item-header">
        <div className="country-image">
          {countryImage && (
            <img
              className="flag"
              src={countryImage}
              alt={`${currency?.cur_nm} flag`}
            />
          )}
        </div>
        <div className="country-name">{currency?.cur_nm.split(" ")[0]}</div>
      </div>
      <div className="amount">
        <h1 className="rate-amount">
          {type === "base" ? amount : convertedAmount.toFixed(2)}
        </h1>
        <div className="currency-unit">{currency?.cur_unit}</div>
      </div>
    </div>
  );
};

export default SelectedCountry;
