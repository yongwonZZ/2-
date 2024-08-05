import React from "react";
import { useNavigate } from "react-router-dom";

interface FashionImagesItemProps {
  imageUrl: string;
  description: string;
  style: string;
}

const FashionImagesItem: React.FC<FashionImagesItemProps> = ({
  imageUrl,
  description,
  style,
}) => {
  const navigate = useNavigate();

  const handleImageClick = (url: string, desc: string, sty: string) => {
    navigate("/lookDetails", {
      state: { imageUrl: url, description: desc, style: sty },
    });
  };

  return (
    <img
      src={imageUrl}
      alt='Fashion-Image'
      onClick={() => handleImageClick(imageUrl, description, style)}
    />
  );
};

export default FashionImagesItem;
