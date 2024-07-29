import React from "react";
import "../airportFashion.css";

const LookFilter: React.FC = () => {
  return (
    <div className='look-button-container'>
      <button>캐주얼</button>
      <button>오피스</button>
      <button>빈티지</button>
      <button>스포티</button>
      <button>럭셔리</button>
      <button>시크</button>
      <button>키치</button>
    </div>
  );
};

export default LookFilter;
