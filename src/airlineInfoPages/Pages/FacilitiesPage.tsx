import React from "react";
import Header from "../../publicComponents/Header";
import FacilitiesItem from "../airlineComponents/FacilitiesItem";

const FacilitiesPage = () => {
  return (
    <div className="container">
      <Header>편의시설</Header>
      <FacilitiesItem />
      <FacilitiesItem />
      <FacilitiesItem />
      <FacilitiesItem />
      <FacilitiesItem />
    </div>
  );
};

export default FacilitiesPage;
