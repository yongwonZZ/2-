import React from "react";
import "../airportFashion.css";

interface LookFilterProps {
  onFilterClick: (filter: string) => void;
  selectedFilter: string;
}

const LookFilter: React.FC<LookFilterProps> = ({
  onFilterClick,
  selectedFilter,
}) => {
  const styles = [
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
    <div className='look-button-container'>
      {styles.map((style) => (
        <button
          key={style}
          onClick={() => onFilterClick(style)}
          style={{
            backgroundColor:
              selectedFilter === style ? "rgb(1, 23, 89)" : "initial",
            color: selectedFilter === style ? "#fff" : "initial",
          }}
        >
          {style === "" ? "전체" : style}
        </button>
      ))}
    </div>
  );
};

export default LookFilter;
