import React from "react";
import { useNavigate } from "react-router-dom";

interface FashionImagesItemProps {
  id: string;
  token: string;
  name: string;
  imageUrl: string;
  description: string;
  style: string;
  date: string;
}

const FashionImagesItem: React.FC<FashionImagesItemProps> = ({
  id,
  token,
  name,
  imageUrl,
  description,
  style,
  date,
}) => {
  const navigate = useNavigate();

  const handleImageClick = (
    id: string,
    token: string,
    name: string,
    url: string,
    desc: string,
    sty: string,
    date: string
  ) => {
    navigate("/lookDetails", {
      state: {
        id: id,
        token: token,
        name: name,
        imageUrl: url,
        description: desc,
        style: sty,
        date: date,
      },
    });
  };

  return (
    <img
      src={imageUrl}
      alt='Fashion-Image'
      onClick={() =>
        handleImageClick(id, token, name, imageUrl, description, style, date)
      }
    />
  );
};

export default FashionImagesItem;
