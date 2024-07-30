import { NavLink } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/react";
import "../Header/header.css";
import { useState } from "react";
import MenuLinks from "../MenuLinks/MenuLinks";
import MobileDrawer from "../DrawerMenu/DrawerMenu";
import { LINKS_NAV_DATA } from "../../../Data/linksNavData";

const Header = () => {
  const [userLogged] = useState(true);

  const linksToShow = userLogged
    ? LINKS_NAV_DATA.filter((link) =>
        ["Recipes", "Generator", "Log Out"].includes(link.name)
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
          />
        </nav>
      ) : (
        <MobileDrawer links={linksToShow} />
      )}
    </header>
  );
};

export default Header;
