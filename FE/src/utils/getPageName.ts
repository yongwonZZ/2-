// 현재 경로에 따른 페이지 이름을 반환하는 함수
export const getPageName = (path: string) => {
  switch (path) {
    case "/":
      return "홈"; // PageNames.MAIN;
    case "/airline-search":
      return "항공편 검색";
    case "/airline-all":
      return "전체 항공편";
    case "/airline-search/*":
      return "항공편 상세";
    case "/terminalmap":
      return "터미널 지도";
    case "/congestion":
      return "출입국 혼잡도";
    case "/facilities":
      return "편의시설";
    case "/parking":
      return "주차";
    case "/exchange":
      return "환율";
    case "/airportFashion":
      return "공항패션";
    case "/login":
      return "로그인";
    case "/login/myPage":
      return "마이페이지";
    case "/login/editProfile":
      return "내 정보 수정";
    case "/boardingPass":
      return "내 티켓";
    case "/postUpload":
      return "포스트 업로드";
    case "/lookDetails":
      return "룩 디테일";
    // 필요한 다른 경로들도 추가합니다.
    default:
      return "사이트 이름"; // 기본 타이틀 설정
  }
};
