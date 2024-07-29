import React from "react";
import "../Styles/SelectedCountry.css";

interface SelectedCountryProps {
  amount: number;
  cur_unit: string;
  cur_nm: string;
  deal_bas_r: string;
}
const SelectedCountry: React.FC<SelectedCountryProps> = ({
  amount,
  cur_unit,
  cur_nm,
  deal_bas_r,
}) => {
  return (
    <div className="country-item">
      <div className="country-item-header">
        <div className="country-image"></div>
        <div className="country-name">{cur_unit}</div>
      </div>
      <h1 className="rate-amount">{amount}</h1>
    </div>
  );
};

export default SelectedCountry;
