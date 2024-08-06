import React, { useEffect, useState } from "react";
import styles from "../../../styles/exchangeRatePage/SelectedCountry.module.css";

interface SelectedCountryProps {
  amount: number;
  cur_unit: string;
  cur_nm: string;
  deal_bas_r: string;
  type: string;
  countryImage?: string; // 이미지 prop 추가
}
const SelectedCountry: React.FC<SelectedCountryProps> = ({
  amount,
  cur_unit,
  cur_nm,
  deal_bas_r,
  type,
  countryImage,
}) => {
  useEffect(() => {
    console.log("type : ", type, amount, "deal : ", deal_bas_r);
  }, [amount]);

  return (
    <div className={styles["country-item"]}>
      <div className={styles["country-item-header"]}>
        <div className={styles["country-image"]}>
          {countryImage && (
            <img className="flag" src={countryImage} alt={`${cur_nm} flag`} />
          )}
        </div>
        <div className={styles["country-name"]}>{cur_unit}</div>
      </div>
      <h1 className={styles["rate-amount"]}>
        {type === "base"
          ? amount
          : Number(deal_bas_r.split(",").join("")) * Number(amount)}
      </h1>
    </div>
  );
};

export default SelectedCountry;
