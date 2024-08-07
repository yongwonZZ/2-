import { FlightFilter } from "../pages/airlinePage/types";

// 아래는 모두 localStorage에 접근하는 함수 재사용하기 위함
export const getSavedFlightFilter = () => {
  const savedFilter = localStorage.getItem("flightFilter");
  return savedFilter ? JSON.parse(savedFilter) : null;
};

export const saveFlightFilter = (filter: FlightFilter) => {
  localStorage.setItem("flightFilter", JSON.stringify(filter));
};

export const getSavedSearchText = () => {
  return localStorage.getItem("searchText") ?? "";
};

export const saveSearchText = (text: string) => {
  localStorage.setItem("searchText", text);
};

export const clearSearchText = () => {
  localStorage.removeItem("searchText");
};
