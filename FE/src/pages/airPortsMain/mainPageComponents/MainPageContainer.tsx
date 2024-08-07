import styles from "../../../styles/mainPage/MainPageContainer.module.css";

type MainPageContainerProps = {
  title: string;
  children: React.ReactNode;
};

// title : Container 상단 제목
// option: option html
// children : 라우팅된 페이지 컴포넌트
function MainPageContainer({ title, children }: MainPageContainerProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default MainPageContainer;
