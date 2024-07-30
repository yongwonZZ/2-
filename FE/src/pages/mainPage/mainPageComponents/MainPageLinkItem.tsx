import { useNavigate } from "react-router-dom";
import styles from "./MainPageLinkItem.module.css";
import { GrNext } from "react-icons/gr";

type MainPageLinkItemProps = {
  icon: React.ReactNode;
  title: string;
  navigateTo: string;
};

function MainPageLinkItem({ icon, title, navigateTo }: MainPageLinkItemProps) {
  const navigate = useNavigate();

  return (
    <div className={styles["link-item"]} onClick={() => navigate(navigateTo)}>
      <div>
        {icon}
        {title}
      </div>
      <GrNext />
    </div>
  );
}

export default MainPageLinkItem;
