import React, { useEffect } from "react";

const FetchTest: React.FC = () => {
  useEffect(() => {
    // API 호출 함수
    const fetchData = async () => {
      try {
        // API 요청
        const response = await fetch(
          "http://localhost:5000/api/boards?page=1&limit=10"
        );

        // 응답 상태 확인
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 응답 텍스트로 변환
        const text = await response.text();
        console.log("Response Text:", text);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <div>Check the console for API response.</div>;
};

export default FetchTest;
