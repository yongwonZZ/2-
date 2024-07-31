import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./postUpload.css";
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

  const [images, setImages] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePostSubmit = () => {
    navigate("/airportFashion", { state: { images, text } });
  };

  return (
    <div className='post-upload-container'>
      <div className='top-container'>
        <button className='back-button' onClick={handleBackClick}>
          <IconArrowBack size={20} />
        </button>
        <h1>코디 올리기</h1>
      </div>
      <hr />
      <p className='description'>스타일이 잘 보이는 사진으로 올려주세요!</p>
      <div className='image-container'>
        <div className='image-file-button'>
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
          <p>{images.length}/10</p>
        </div>
        {images.map((image, index) => (
          <div className='image-seleted' key={index}>
            <img src={image} alt={`Upload ${index}`} />
            <button onClick={() => handleRemoveImage(index)}>
              <IconClose size={16} />
            </button>
          </div>
        ))}
      </div>

      <p className='description'>내용을 입력해주세요.</p>
      <div className='textarea-container'>
        <textarea
          placeholder='착용한 #스타일을 소개해주세요.'
          maxLength={MAXLENGTH}
          onChange={handleLengthCheck}
        ></textarea>
        <p>
          {text.length}/{MAXLENGTH}
        </p>
      </div>
      <p className='description'>스타일</p>
      <div>
        <div className='look-style-button'>
          <button>캐주얼</button>
          <button>오피스</button>
          <button>빈티지</button>
          <button>스포티</button>
          <button>럭셔리</button>
          <button>시크</button>
          <button>키치</button>
        </div>
      </div>
      <button className='post-registration-button' onClick={handlePostSubmit}>
        등록하기
      </button>
    </div>
  );
};

export default PostUpload;
