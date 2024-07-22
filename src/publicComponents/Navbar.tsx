import styles from "./Navbar.module.css";
import NavbarList from "../publicComponents/NavbarList";

// navigateTo에 string 타입으로 이동할 라우트 경로를 적으면 그 페이지로 이동
function Navbar() {
  return (
    <ul className={styles.navbar}>
      <NavbarList title="공항" navigateTo="/" />
      <NavbarList title="환율" navigateTo="#" />
      <NavbarList title="내 티켓" navigateTo="#" />
      <NavbarList title="공항패션" navigateTo="#" />
      <NavbarList title="마이페이지" navigateTo="#" />
    </ul>
  );
}

export default Navbar;
