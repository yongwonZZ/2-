import { useNavigate } from "react-router-dom";

type MainPageSubCardProps = {
  mainIcon: React.ReactNode;
  title: string;
  description?: string;
  arrowIcon: React.ReactNode;
};

function MainPageSubCard({
  mainIcon,
  title,
  description,
  arrowIcon,
}: MainPageSubCardProps) {
  const mainPageNavigator = useNavigate();

  return <div onClick={() => mainPageNavigator("#")}></div>;
}

export default MainPageSubCard;
