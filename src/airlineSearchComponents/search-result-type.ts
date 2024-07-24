/** 항공편 조회 결과의 타입 정의 */
export type searchResultType = {
  airline: string;
  flightId: string;
  scheduleDateTime: string;
  estimatedDateTime: string;
  airport: string;
  gatenumber?: string;
  carousel?: string;
  exitnumber?: string;
  codeshare: "Master" | "Slave";
  masterflightid?: string;
  remark: "도착" | "결항" | "지연" | "회항" | "착륙" | null;
  airportCode: string;
  terminalid: string;
};
