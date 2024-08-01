import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./airportFashion.css";
import LookFilter from "./airportFashionComponents/LookFilter";
import FashionImagesItem from "./airportFashionComponents/FashionImagesItem";
import LookSort from "./airportFashionComponents/LookSort";
import { PiPencilSimpleLine } from "react-icons/pi";
import { IoIosArrowBack as IconArrowBack } from "react-icons/io";

const AirportFashion: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<
    { images: string[]; text: string; style: string }[]
  >([]);
  const [filteredPosts, setFilteredPosts] = useState<
    { images: string[]; text: string; style: string }[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(storedPosts);
    setFilteredPosts(storedPosts);
  }, []);

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleUploadButtonClick = () => {
    navigate("/PostUpload");
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    if (filter === "") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.style === filter));
    }
  };

  return (
    <div className='airport-fashion-main-container'>
      <div className='airport-fashion-top'>
        <button className='back-button' onClick={handleBackClick}>
          <IconArrowBack size={20} />
        </button>
        <h1>공항 패션</h1>
        <hr />
        <LookFilter onFilterClick={handleFilterClick} />
        <LookSort />
      </div>
      <div className='fashion-items-top'>
        <div className='fashion-items-container'>
          {filteredPosts.map((post, index) =>
            post.images.map((url, imgIndex) => (
              <FashionImagesItem
                key={`${index}-${imgIndex}`}
                imageUrl={url}
                description={post.text}
              />
            ))
          )}
        </div>
      </div>
      <div className='upload-button'>
        <button onClick={handleUploadButtonClick}>
          <PiPencilSimpleLine size={24} />
        </button>
      </div>
    </div>
  );
};

export default AirportFashion;
