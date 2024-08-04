// FlightFilterForAllPage 타입은 전체 항공편 페이지에서의 필터 옵션.
// FlightFilter 타입은 항공편 검색 페이지에서의 필터 옵션.
// arrivals, t1 옵션이 겹치므로 extends(&&) 키워드 사용함.
export type FlightFilterForAllPage = {
  arrivals: boolean;
  t1: boolean;
};

export type FlightFilter = FlightFilterForAllPage & {
  departures: boolean;
  t2: boolean;
  flightId: boolean;
  airline: boolean;
  airport: boolean;
  carousel: boolean;
  exitnumber: boolean;
  gatenumber: boolean;
};

export const filterNameMap: Record<keyof FlightFilter, string> = {
  arrivals: "도착",
  departures: "출발",
  t1: "터미널 1",
  t2: "터미널 2",
  flightId: "편명",
  airline: "항공사",
  airport: "공항",
  carousel: "수하물 수취대",
  exitnumber: "출구",
  gatenumber: "게이트",
};
