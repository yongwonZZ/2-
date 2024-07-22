import styles from "./Navbar.module.css";
import NavbarList from "./NavbarList";

function Navbar() {
  return (
    <ul className={styles.navbar}>
      <NavbarList title="공항" />
      <NavbarList title="환율" />
      <NavbarList title="내 티켓" />
      <NavbarList title="공항패션" />
      <NavbarList title="마이페이지" />
    </ul>
  );
}

export default Navbar;
