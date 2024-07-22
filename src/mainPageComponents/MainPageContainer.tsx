import styles from "./MainPageContainer.module.css";

type MainPageContainerProps = {
  title: string;
  option?: React.ReactNode;
  children: React.ReactNode;
};

// title : Container 상단 제목
// option: option html
// children : 라우팅된 페이지 컴포넌트
function MainPageContainer({
  title,
  option,
  children,
}: MainPageContainerProps) {
  return (
    <div>
      <div className={styles["container-header"]}>
        <h3>{title}</h3>
        {option}
      </div>
      <div className={styles["container-children"]}>{children}</div>
    </div>
  );
}

export default MainPageContainer;
