import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/airportFashion/airportFashion.module.css";
import styleBackBtn from "../../styles/airportFashion/airportFashionPost/lookDetails.module.css";
import LookFilter from "./airportFashionComponents/LookFilter";
import FashionImagesItem from "./airportFashionComponents/FashionImagesItem";
import LookSort from "./airportFashionComponents/LookSort";
import { PiPencilSimpleLine } from "react-icons/pi";
import { IoIosArrowBack as IconArrowBack } from "react-icons/io";

const AirportFashion: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<
    { images: string[]; text: string; style: string; date: string }[]
  >([]);
  const [filteredPosts, setFilteredPosts] = useState<
    { images: string[]; text: string; style: string; date: string }[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  useEffect(() => {
    // API 요청을 통해 게시글 목록 데이터를 가져오는 함수
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/boards?page=1&limit=10"
        ); // API 엔드포인트
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // boardList에서 게시글 목록을 추출
        const boardList = data.boardList.map((item: any) => ({
          images: [item.img],
          text: item.contents,
          style: item.category,
          date: item.date,
        }));
        setPosts(boardList);
        setFilteredPosts(boardList);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchPosts();
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
      setFilteredPosts(posts); // 선택한 필터가 없으면 전체 게시글 목록으로 설정
    } else {
      setFilteredPosts(posts.filter((post) => post.style === filter)); // 선택한 스타일에 따라 필터링
    }
  };

  return (
    <div className={styles["airport-fashion-main-container"]}>
      <div className={styles["airport-fashion-top"]}>
        <button
          className={styleBackBtn["back-button"]}
          onClick={handleBackClick}
        >
          <IconArrowBack size={20} />
        </button>
        <h1>공항 패션</h1>
        <hr />
        <LookFilter
          onFilterClick={handleFilterClick}
          selectedFilter={selectedFilter}
        />
        <LookSort />
      </div>
      <div className={styles["fashion-items-top"]}>
        <div className={styles["fashion-items-container"]}>
          <div className={styles["fashion-img-container"]}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) =>
                post.images.map((url, imgIndex) => (
                  <FashionImagesItem
                    key={`${index}-${imgIndex}`}
                    imageUrl={url}
                    description={post.text}
                    style={post.style}
                    date={post.date}
                  />
                ))
              )
            ) : (
              <p>No posts available.</p> // 게시글이 없을 경우 메시지 표시
            )}
          </div>
        </div>
      </div>
      <div className={styles["upload-button"]}>
        <button onClick={handleUploadButtonClick}>
          <PiPencilSimpleLine size={24} />
        </button>
      </div>
    </div>
  );
};

export default AirportFashion;
