import React from "react";
import "../Styles/SelectedCountry.css";

interface SelectedCountryProps {
  amount: number;
}
const SelectedCountry: React.FC<SelectedCountryProps> = ({ amount }) => {
  return (
    <div className="country-item">
      <div className="country-item-header">
        <div className="country-image"></div>
        <div className="country-name">KRW</div>
      </div>
      <h1 className="rate-amount">{amount}</h1>
    </div>
  );
};

export default SelectedCountry;
