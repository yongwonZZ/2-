import { useNavigate } from "react-router-dom";
import styles from "../styles/components/NavbarList.module.css";

type NavbarListProps = {
    icon: React.ReactNode;
    title: string;
    navigateTo: string;
    isSelected: boolean;
    setSelected: (title: string) => void;
    requiresAuth?: boolean;
};

const NavbarList: React.FC<NavbarListProps> = ({
                                                   icon,
                                                   title,
                                                   navigateTo,
                                                   isSelected,
                                                   setSelected,
                                                   requiresAuth = false,
                                               }) => {
    const navigate = useNavigate();

    const handleNavigateTo = () => {
        if (requiresAuth && !localStorage.getItem('token')) {
            console.log('No token found, redirecting to login.');
            navigate('/login');
        } else {
            setSelected(title);
            navigate(navigateTo);
        }
    };

    return (
        <div className={styles.container} onClick={handleNavigateTo}>
            <li className={isSelected ? styles.selected : styles.notSelected}>
                <p className={styles.icon}>{icon}</p>
                <p>{title}</p>
            </li>
        </div>
    );
};

export default NavbarList;
