import { useNavigate } from "react-router-dom";

type MainPageSubContainerProps = {
  mainIcon: React.ReactNode;
  title: string;
  description?: string;
  arrowIcon: React.ReactNode;
};

function MainPageSubContainer({
  mainIcon,
  title,
  description,
  arrowIcon,
}: MainPageSubContainerProps) {
  const mainPageNavigator = useNavigate();

  return <div onClick={() => mainPageNavigator("#")}></div>;
}

export default MainPageSubContainer;
