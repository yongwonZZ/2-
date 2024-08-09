import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../../../styles/airportFashion/airportFashionPost/postUpload.module.css";
import styleBackBtn from "../../../styles/airportFashion/airportFashionPost/lookDetails.module.css";

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
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImageFiles(fileArray);

      // 이미지 미리보기  URL 생성
      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setImageURLs(urls);

      // Presigned URL을 받아서 S3에 업로드
      for (const file of fileArray) {
        const fileName = file.name;
        const fileType = file.type;

        try {
          const presignedURLResponse = await axios.get(
            "http://localhost:5000/api/boards/presigned-url",
            {
              params: {
                fileName: encodeURIComponent(fileName),
                fileType: encodeURIComponent(fileType),
              },
            }
          );

          const { uploadURL } = presignedURLResponse.data;

          await axios.put(uploadURL, file, {
            headers: {
              "Content-Type": fileType,
            },
          });
        } catch (error) {
          console.error("Error uploading file:", error);
          alert("파일 업로드에 실패했습니다. 다시 시도해주세요.");
          return;
        }
      }
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
    // 로컬 스토리지에서 사용자 토큰 가져오기
    const userToken = localStorage.getItem("token");

    if (!userToken) {
      alert("로그인 후에만 게시글을 등록할 수 있습니다.");
      return;
    }

    if (!selectedStyle) {
      alert("스타일을 선택해주세요.");
      return;
    }

    // 게시글 고유 아이디 생성
    const postId = Date.now().toString();

    // 로컬 스토리지 사용자 이름 가져오기
    const userString = localStorage.getItem("user");
    const username: string = userString
      ? JSON.parse(userString).userName ?? ""
      : "";

    const newPost = {
      id: postId,
      token: userToken, // 인증 토큰
      name: username,
      images: imageURLs,
      text,
      style: selectedStyle,
      date: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/boards",
        newPost,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Response Status:", response.status);

      navigate("/airportFashion");
    } catch (error) {
      console.error("There was a problem with the post operation:", error);
      alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
    }
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
