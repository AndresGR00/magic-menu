import { NavLink, useNavigate } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/react";
import "../Header/header.css";
import MenuLinks from "../MenuLinks/MenuLinks";
import MobileDrawer from "../DrawerMenu/DrawerMenu";
import { LINKS_NAV_DATA } from "../../../Data/linksNavData";
import { useAuth } from "../../../Context/AuthContext";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linksToShow = isLoggedIn
    ? LINKS_NAV_DATA.filter((link) =>
        ["Recipes", "Generator", "New Recipe", "Log Out"].includes(link.name)
      )
    : LINKS_NAV_DATA.filter((link) =>
        ["Log In", "Register"].includes(link.name)
      );

  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <header>
      <NavLink to="">
        <h2 className="mm-logo">MM</h2>
      </NavLink>
      {isDesktop ? (
        <nav>
          <MenuLinks
            links={linksToShow}
            ulClass="main-menu"
            liClass="main-item"
            onLogout={handleLogout}
          />
        </nav>
      ) : (
        <MobileDrawer links={linksToShow} onLogout={handleLogout} />
      )}
    </header>
  );
};

export default Header;
