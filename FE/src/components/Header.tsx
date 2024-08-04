import { memo } from "react";
import styles from "./Header.module.css";

type HeaderProps = {
  leftContent?: React.ReactNode; // Header 좌측에 위치할 것들(뒤로 가기 기능 icon 등..)
  centerContent?: React.ReactNode; // Header 중앙에 위치할 것들(검색 input 등..)
  rightContent?: React.ReactNode; // Header 우측에 위치할 것들(필터 기능 icon 등..)
};

const Header = memo(function Header({
  leftContent,
  centerContent,
  rightContent,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      {leftContent && <div className={styles.left}>{leftContent}</div>}
      {centerContent && <div className={styles.center}>{centerContent}</div>}
      {rightContent && <div className={styles.right}>{rightContent}</div>}
    </header>
  );
});

export default Header;
