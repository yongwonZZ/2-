import { useNavigate } from "react-router-dom";
import styles from "../styles/components/NavbarList.module.css";

type NavbarListProps = {
    icon: React.ReactNode;
    title: string;
    navigateTo: string;
    isSelected: boolean;
    setSelected: (title: string) => void;
    requiresAuth?: boolean; // 추가된 부분: 로그인이 필요한지 여부를 명시
};

function NavbarList({
                        icon,
                        title,
                        navigateTo,
                        isSelected,
                        setSelected,
                        requiresAuth = false // 기본값은 false로 설정
                    }: NavbarListProps) {
    const navigate = useNavigate();

    const handleNavigateTo = () => {
        const token = localStorage.getItem('token');
        if (requiresAuth && !token) { // 로그인이 필요한 페이지에 토큰이 없으면 로그인 페이지로 리디렉션
            console.log('No token found, redirecting to login.');
            navigate('/login');
        } else {
            navigate(navigateTo);
            setSelected(title); // 클릭된 항목을 선택 상태로 설정
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
}

export default NavbarList;
