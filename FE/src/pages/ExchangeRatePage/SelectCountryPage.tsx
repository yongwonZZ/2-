import React from "react";
import Header from "../../components/Header";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const SelectCountryPage = () => {
  return (
    <div className="container">
      <Header
        leftContent={
          <>
            <div className="parking-header">
              <Link to={"/exchange"}>
                <FaChevronLeft
                  style={{ fontSize: "22px", cursor: "pointer" }}
                />
              </Link>
              통화
            </div>
          </>
        }
      />
    </div>
  );
};

export default SelectCountryPage;
