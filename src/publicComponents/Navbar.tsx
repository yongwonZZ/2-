import styles from "./Navbar.module.css";
import NavbarList from "../publicComponents/NavbarList";
import { useState } from "react";
import { MdLocalAirport, MdOutlineAirplaneTicket } from "react-icons/md";
import { RiExchangeDollarLine } from "react-icons/ri";
import { TbHanger } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";

// navigateTo에 string 타입으로 이동할 라우트 경로를 적으면 그 페이지로 이동
function Navbar() {
  const [selected, setSelected] = useState("공항");

  return (
    <ul className={styles.navbar}>
      <NavbarList
        icon={<MdLocalAirport />}
        title="공항"
        navigateTo="/"
        isSelected={selected === "공항"}
        setSelected={setSelected}
      />
      <NavbarList
        icon={<RiExchangeDollarLine />}
        title="환율"
        navigateTo="#"
        isSelected={selected === "환율"}
        setSelected={setSelected}
      />
      <NavbarList
        icon={<MdOutlineAirplaneTicket />}
        title="내 티켓"
        navigateTo="#"
        isSelected={selected === "내 티켓"}
        setSelected={setSelected}
      />
      <NavbarList
        icon={<TbHanger />}
        title="공항패션"
        navigateTo="#"
        isSelected={selected === "공항패션"}
        setSelected={setSelected}
      />
      <NavbarList
        icon={<FaRegUser />}
        title="마이페이지"
        navigateTo="#"
        isSelected={selected === "마이페이지"}
        setSelected={setSelected}
      />
    </ul>
  );
}

export default Navbar;
