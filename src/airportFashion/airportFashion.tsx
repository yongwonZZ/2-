import React from "react";
import "./airportFashion.css";

function AirportFashion() {
  return (
    <div>
      <h1>공항 패션</h1>
      <hr />
      <div className='look-button'>
        <button>캐주얼</button>
        <button>스트릿</button>
        <button>시크</button>
        <button>키치</button>
      </div>
      <div className='fashion-img-container'>
        <img
          src='https://cdn.wedding21.co.kr/news/photo/202307/259619_124101_5712.jpg'
          alt='Fashion-Image'
        />
        <img
          src='https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/09/20/38ca715c-6500-4939-86c9-6271c5d73cab.jpg'
          alt='Fashion-Image'
        />
        <img
          src='https://image.xportsnews.com/contents/images/upload/article/2022/0912/mb_1662936276431384.jpg'
          alt='Fashion-Image'
        />
      </div>
    </div>
  );
}

export default AirportFashion;
