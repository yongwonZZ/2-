import React from "react";
import "../../../styles/airportFashion/airportFashion.module.css";

const LookSort: React.FC = () => {
  return (
    <div className='look-sort-container'>
      <button>추천순</button>
      <p>|</p>
      <button>최신순</button>
    </div>
  );
};

export default LookSort;
