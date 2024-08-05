import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../../../styles/airportFashionPost/postUpload.module.css";
import styleBackBtn from "../../../styles/airportFashionPost/lookDetails.module.css";

import { IoIosArrowBack as IconArrowBack } from "react-icons/io";
import { GoPlus as IconPlus } from "react-icons/go";
import { IoCloseOutline as IconClose } from "react-icons/io5";

const PostUpload: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 실시간 글자수 세기
  const [text, setText] = useState("");
  const MAXLENGTH = 100;

  const handleLengthCheck = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // 이미지 파일 선택
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const imageURL = URL.createObjectURL(file);
      setImageURLs([...imageURLs, imageURL]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageURLs(imageURLs.filter((_, i) => i !== index));
  };

  // 룩 스타일 선택
  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
  };

  const handlePostSubmit = () => {
    if (!selectedStyle) {
      alert("스타일을 선택해주세요.");
      return;
    }
    const newPost = { images: imageURLs, text, style: selectedStyle };

    // 일단 로컬스토리지에 저장 -> 추후 db 연결
    const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    existingPosts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(existingPosts));
    navigate("/airportFashion", { state: newPost });
  };

  return (
    <div className={styles["post-upload-container"]}>
      <div className={styles["top-container"]}>
        <button
          className={styleBackBtn["back-button"]}
          onClick={handleBackClick}
        >
          <IconArrowBack size={20} />
        </button>
        <h1>코디 올리기</h1>
      </div>
      <hr />
      <p className={styles["description"]}>
        스타일이 잘 보이는 사진으로 올려주세요!
      </p>
      <div className={styles["image-container"]}>
        <div className={styles["image-file-button"]}>
          <label htmlFor='file-input'>
            <IconPlus size={20} />
          </label>
          <input
            id='file-input'
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <p>{imageURLs.length}/10</p>
        </div>
        {imageURLs.map((image, index) => (
          <div className={styles["image-seleted"]} key={index}>
            <img src={image} alt={`Upload ${index}`} />
            <button onClick={() => handleRemoveImage(index)}>
              <IconClose size={16} />
            </button>
          </div>
        ))}
      </div>

      <p className={styles["description"]}>내용을 입력해주세요.</p>
      <div className={styles["textarea-container"]}>
        <textarea
          placeholder='착용한 #스타일을 소개해주세요.'
          maxLength={MAXLENGTH}
          onChange={handleLengthCheck}
        ></textarea>
        <p>
          {text.length}/{MAXLENGTH}
        </p>
      </div>
      <p className={styles["description"]}>스타일</p>
      <div>
        <div className={styles["look-style-button"]}>
          {[
            "캐주얼",
            "오피스",
            "빈티지",
            "스포티",
            "럭셔리",
            "시크",
            "키치",
          ].map((style) => (
            <button key={style} onClick={() => handleStyleSelect(style)}>
              {style}
            </button>
          ))}
        </div>
      </div>
      <button
        className={styles["post-registration-button"]}
        onClick={handlePostSubmit}
      >
        등록하기
      </button>
    </div>
  );
};

export default PostUpload;
