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
    <img
      src={imageUrl}
      alt='Fashion-Image'
      onClick={() => handleImageClick(imageUrl, description)}
    />
  );
};

export default FashionImagesItem;
