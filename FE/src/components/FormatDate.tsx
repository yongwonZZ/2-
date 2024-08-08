import React from "react";

interface FormatDateProps {
  date: string;
}

const FormatDate: React.FC<FormatDateProps> = ({ date }) => {
  // ISO 8601 문자열을 Date 객체로 변환
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = `0${dateObj.getMonth() + 1}`.slice(-2);
  const day = `${dateObj.getDate()}`.slice(-2);
  const hours = `0${dateObj.getHours()}`.slice(-2);
  const minutes = `0${dateObj.getMinutes()}`.slice(-2);

  // 포맷팅된 문자열 생성
  const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;

  return <span>{formattedDate}</span>;
};

export default FormatDate;
