import { useNavigate } from "react-router-dom";
import styles from "../../../styles/mainPage/MainPageLinkItem.module.css";
import { GrNext } from "react-icons/gr";

type MainPageLinkItemProps = {
  icon: React.ReactNode;
  title: string;
  navigateTo: string;
};

const containerVariants = {
  hidden: { opacity: 0, x: "-100vw" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
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
