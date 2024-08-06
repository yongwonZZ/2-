import React from "react";
import { useNavigate } from "react-router-dom";

interface FashionImagesItemProps {
  imageUrl: string;
  description: string;
  style: string;
  date: string;
}

const FashionImagesItem: React.FC<FashionImagesItemProps> = ({
  imageUrl,
  description,
  style,
  date,
}) => {
  const navigate = useNavigate();

  const handleImageClick = (
    url: string,
    desc: string,
    sty: string,
    date: string
  ) => {
    navigate("/lookDetails", {
      state: { imageUrl: url, description: desc, style: sty, date: date },
    });
  };

  return (
    <img
      src={imageUrl}
      alt='Fashion-Image'
      onClick={() => handleImageClick(imageUrl, description, style, date)}
    />
  );
};

export default FashionImagesItem;
