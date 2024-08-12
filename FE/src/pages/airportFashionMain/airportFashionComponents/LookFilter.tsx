import React from "react";
import styles from "../../../styles/airportFashion/airportFashion.module.css";

interface LookFilterProps {
  onFilterClick: (filter: string) => void;
  selectedFilter: string;
}

const LookFilter: React.FC<LookFilterProps> = ({
  onFilterClick,
  selectedFilter,
}) => {
  const lookStyles = [
    "",
    "캐주얼",
    "오피스",
    "빈티지",
    "스포티",
    "럭셔리",
    "시크",
    "키치",
  ];

  return (
    <div className={styles["look-button-container"]}>
      {lookStyles.map((lookStyle) => (
        <button
          key={lookStyle}
          onClick={() => onFilterClick(lookStyle)}
          style={{
            backgroundColor:
              selectedFilter === lookStyle ? "rgb(1, 23, 89)" : "initial",
            color: selectedFilter === lookStyle ? "#fff" : "initial",
          }}
        >
          {lookStyle === "" ? "전체" : lookStyle}
        </button>
      ))}
    </div>
  );
};

export default LookFilter;
