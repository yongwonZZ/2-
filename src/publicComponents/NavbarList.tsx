import { useNavigate } from "react-router-dom";

type NavbarListProps = {
  title: string;
  navigateTo: string;
};

function NavbarList({ title, navigateTo }: NavbarListProps) {
  const navbarNavigator = useNavigate();

  return (
    <div onClick={() => navbarNavigator(navigateTo)}>
      <li>
        <p>{title}</p>
      </li>
    </div>
  );
}

export default NavbarList;
