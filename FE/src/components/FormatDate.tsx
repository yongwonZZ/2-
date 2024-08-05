import React from "react";

interface FormatDateProps {
  date: Date;
}

const FormatDate: React.FC<FormatDateProps> = ({ date }) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return (
    <span>
      {year}년 {month}월 {day}일
    </span>
  );
};

export default FormatDate;
