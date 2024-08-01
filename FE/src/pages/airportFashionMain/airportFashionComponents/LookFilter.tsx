import React from "react";
import "../airportFashion.css";

interface LookFilterProps {
  onFilterClick: (filter: string) => void;
}

const LookFilter: React.FC<LookFilterProps> = ({ onFilterClick }) => {
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
        <button key={style} onClick={() => onFilterClick(style)}>
          {style === "" ? "전체" : style}
        </button>
      ))}
    </div>
  );
};

export default LookFilter;
