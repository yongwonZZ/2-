import React from "react";
import "../Styles/ExRateHeaderItem.css";

interface ExRateHeaderItemProps {
  curUnit: string;
  dealBasR: string;
}

const ExRateHeaderItem: React.FC<ExRateHeaderItemProps> = ({
  curUnit,
  dealBasR,
}) => {
  return (
    <div className="rate-items">
      <div className="rate-item">{curUnit}</div>
      <div className="rate-item">{dealBasR}</div>
    </div>
  );
};

export default ExRateHeaderItem;
