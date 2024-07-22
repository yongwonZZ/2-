import { useNavigate } from "react-router-dom";

type NavbarListProps = {
  title: string;
};

function NavbarList({ title }: NavbarListProps) {
  const navbarNavigator = useNavigate();

  return (
    <div onClick={() => navbarNavigator("#")}>
      <li>
        <p>{title}</p>
      </li>
    </div>
  );
}

export default NavbarList;
