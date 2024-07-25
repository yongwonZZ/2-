import React from "react";
import { useNavigate } from "react-router-dom";
import "../airportFashion.css";
import { fashionImageUrls } from "./fashionImageUrls";

const FashionImagesItem: React.FC = () => {
  const navigate = useNavigate();

  const handleImageClick = (imageUrl: string) => {
    navigate("/lookDetails", { state: { imageUrl } });
  };
  return (
    <div className='fashion-img-container'>
      {fashionImageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Fashion-Image${index}`}
          onClick={() => handleImageClick(url)}
        />
      ))}
    </div>
  );
};

export default FashionImagesItem;
