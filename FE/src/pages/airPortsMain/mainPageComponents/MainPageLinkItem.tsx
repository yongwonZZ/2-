import { useNavigate } from "react-router-dom";
import styles from "../../../styles/mainPage/MainPageLinkItem.module.css";
import stylesFont from "../../../global.module.css";
import { GrNext } from "react-icons/gr";

type MainPageLinkItemProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  navigateTo: string;
};

function MainPageLinkItem({
  icon,
  title,
  description,
  navigateTo,
}: MainPageLinkItemProps) {
  const navigate = useNavigate();

  return (
    <div className={styles["link-item"]} onClick={() => navigate(navigateTo)}>
      <div className={styles["item-left"]}>
        {icon}
        <div>
          <p className={`${stylesFont["font-base"]} ${styles.title}`}>
            {title}
          </p>
          <p className={`${stylesFont["font-base"]} ${styles.description}`}>
            {description}
          </p>
        </div>
      </div>
      <GrNext />
    </div>
  );
}

export default MainPageLinkItem;
