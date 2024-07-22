import styles from "./MainPageCard.module.css";

type MainPageCardProps = {
  title: string;
  option?: React.ReactNode;
  children: React.ReactNode;
};

// title : Card 상단 제목
// option: option html
// children : 라우팅된 페이지 컴포넌트
function MainPageCard({ title, option, children }: MainPageCardProps) {
  return (
    <div>
      <div className={styles["card-header"]}>
        <h3>{title}</h3>
        {option}
      </div>
      <div className={styles["card-children"]}>{children}</div>
    </div>
  );
}

export default MainPageCard;
