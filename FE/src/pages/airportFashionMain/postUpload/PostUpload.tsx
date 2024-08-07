import React from "react";
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

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files && files[0]) {
  //     const file = files[0];
  //     const imageURL = URL.createObjectURL(file);
  //     setImageURLs([...imageURLs, imageURL]);
  //   }
  // };

  // 테테텥테스스스스트트트틑ㅌㅌ
   // 이미지 파일 선택
   const [imageFiles, setImageFiles] = useState<File[]>([]); 
 
   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
     const files = e.target.files;
     if (files) {
       const fileArray = Array.from(files);
       setImageFiles(fileArray);
       
       // 이미지를 미리 보기 위해 URL 생성
       const urls = fileArray.map(file => URL.createObjectURL(file));
       setImageURLs(urls);
 
       // Presigned URL을 받아서 S3에 업로드
       for (const file of fileArray) {
         const fileName = file.name;
         const fileType = file.type;
         const presignedURLResponse = await fetch(`http://localhost:5000/api/boards/presigned-url?fileName=${encodeURIComponent(fileName)}&fileType=${encodeURIComponent(fileType)}`);
         const presignedURLData = await presignedURLResponse.json();
         await fetch(presignedURLData.uploadURL, {
           method: "PUT",
           headers: {
             "Content-Type": fileType,
           },
           body: file,
         });
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

  const handlePostSubmit = async () => {
    if (!selectedStyle) {
      alert("스타일을 선택해주세요.");
      return;
    }

    const userToken = localStorage.getItem("token");
    console.log("User Token:", userToken);

    if (!userToken) {
      alert("로그인 후에만 게시글을 등록할 수 있습니다.");
      return;
    } 

    // 로컬 스토리지에서 읽어온 토큰을 쿠키로 설정
  document.cookie = `accessToken=${userToken}; path=/;`;

    const newPost = {
      category: selectedStyle,
      userId: "66b3271e45b4dcb3b7178924", // 실제 사용자 ID로 변경 필요
      contents: text,
      img: imageURLs[0] || "", // 이미지가 없을 경우 빈 문자열로 처리
    };

    
    try {
      const response = await fetch("http://localhost:5000/api/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${userToken}`,
        },
        body: JSON.stringify(newPost), 
      });

      console.log("Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate("/airportFashion");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // const handlePostSubmit = () => {
  //   // 로컬 스토리지에서 사용자 토큰 가져오기
  //   const userToken = localStorage.getItem("token");

  //   if (!userToken) {
  //     alert("로그인 후에만 게시글을 등록할 수 있습니다.");
  //     return;
  //   }

  //   if (!selectedStyle) {
  //     alert("스타일을 선택해주세요.");
  //     return;
  //   }
  //   const newPost = {
  //     images: imageURLs,
  //     text,
  //     style: selectedStyle,
  //     date: new Date().toISOString(),
  //     token: userToken, // 인증 토큰을 포함
  //   };

  //   // 일단 로컬스토리지에 저장 -> 추후 db 연결
  //   const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");
  //   existingPosts.push(newPost);
  //   localStorage.setItem("posts", JSON.stringify(existingPosts));
  //   navigate("/airportFashion", { state: newPost });
  // };

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
