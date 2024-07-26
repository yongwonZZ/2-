export type FlightFilter = {
  arrivals: boolean;
  departures: boolean;
  t1: boolean;
  t2: boolean;
  flightId: boolean;
  airline: boolean;
  airport: boolean;
  baggageClaim: boolean;
  exit: boolean;
  gate: boolean;
};

export const filterNameMap: Record<keyof FlightFilter, string> = {
  arrivals: "도착",
  departures: "출발",
  t1: "터미널 1",
  t2: "터미널 2",
  flightId: "편명",
  airline: "항공사",
  airport: "공항",
  baggageClaim: "수하물 수취대",
  exit: "출구",
  gate: "게이트",
};
