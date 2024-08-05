import { memo } from "react";
import styles from "../styles/components/Navbar.module.css";
import NavbarList from "./NavbarList";
import { useState } from "react";
import { MdLocalAirport, MdOutlineAirplaneTicket } from "react-icons/md";
import { RiExchangeDollarLine } from "react-icons/ri";
import { TbHanger } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";

interface NavbarProps {
    ticketCount: number;
}

function Navbar({ ticketCount }: NavbarProps) {
    const [selected, setSelected] = useState("공항");

    const handleSelectList = (title: string) => setSelected(title);

    return (
        <ul className={styles.navbar}>
            <NavbarList
                icon={<MdLocalAirport />}
                title="공항"
                navigateTo="/"
                isSelected={selected === "공항"}
                setSelected={handleSelectList}
            />
            <NavbarList
                icon={<RiExchangeDollarLine />}
                title="환율"
                navigateTo="/exchange"
                isSelected={selected === "환율"}
                setSelected={handleSelectList}
            />
            <NavbarList
                icon={<MdOutlineAirplaneTicket />}
                title={`내 티켓 (${ticketCount})`}
                navigateTo="/boardingPass"
                isSelected={selected === "내 티켓"}
                setSelected={handleSelectList}
            />
            <NavbarList
                icon={<TbHanger />}
                title="공항패션"
                navigateTo="/airportFashion"
                isSelected={selected === "공항패션"}
                setSelected={handleSelectList}
            />
            <NavbarList
                icon={<FaRegUser />}
                title="마이페이지"
                navigateTo="/Login"
                isSelected={selected === "마이페이지"}
                setSelected={handleSelectList}
            />
        </ul>
    );
}

export default Navbar;
