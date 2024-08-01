import React from "react";
import { useNavigate } from "react-router-dom";
import "../airportFashion.css";

interface FashionImagesItemProps {
  imageUrl: string;
  description: string;
}

const FashionImagesItem: React.FC<FashionImagesItemProps> = ({
  imageUrl,
  description,
}) => {
  const navigate = useNavigate();

  const handleImageClick = (url: string, desc: string) => {
    navigate("/lookDetails", { state: { imageUrl: url, description: desc } });
  };

  return (
    <div className='fashion-img-container'>
      <img
        src={imageUrl}
        alt='Fashion-Image'
        onClick={() => handleImageClick(imageUrl, description)}
      />
    </div>
  );
};

export default FashionImagesItem;
