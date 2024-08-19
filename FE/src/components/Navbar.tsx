import { memo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/components/Navbar.module.css";
import NavbarList from "./NavbarList";
import { MdLocalAirport, MdOutlineAirplaneTicket } from "react-icons/md";
import { RiExchangeDollarLine } from "react-icons/ri";
import { TbHanger } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { isAuthenticated } from "../utils/TokenUtils";

const Navbar: React.FC = () => {
    const [selected, setSelected] = useState("공항");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        switch (path) {
            case '/':
                setSelected("공항");
                break;
            case '/exchange':
                setSelected("환율");
                break;
            case '/boardingPass':
                setSelected("내 티켓");
                break;
            case '/airportFashion':
                setSelected("공항패션");
                break;
            case '/login':
                setSelected(isAuthenticated() ? "마이페이지" : "로그인");
                break;
            case '/login/myPage':
                setSelected("마이페이지");
                break;
            default:
                setSelected("");
        }
    }, [location.pathname]);

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
                title={`내 티켓`}
                navigateTo="/boardingPass"
                isSelected={selected === "내 티켓"}
                setSelected={handleSelectList}
                requiresAuth={true}
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
                title={isAuthenticated() ? "마이페이지" : "로그인"}
                navigateTo={isAuthenticated() ? "/login/myPage" : "/login"}
                isSelected={selected === "마이페이지" || selected === "로그인"}
                setSelected={handleSelectList}
            />
        </ul>
    );
};

export default memo(Navbar);
