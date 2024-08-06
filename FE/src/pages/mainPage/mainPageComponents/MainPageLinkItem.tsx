import { useNavigate } from "react-router-dom";
import styles from "../../../styles/mainPage/MainPageLinkItem.module.css";
import { motion } from "framer-motion";

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
    <motion.div
      className={styles["link-item"]}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onClick={() => navigate(navigateTo)}
    >
      <div style={{ width: "80%" }}>{icon}</div>
      <p className={styles.title}>{title}</p>
    </motion.div>
  );
}

export default MainPageLinkItem;
