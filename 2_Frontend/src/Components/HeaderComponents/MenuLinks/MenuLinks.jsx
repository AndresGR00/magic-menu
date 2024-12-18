import { NavLink } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const MenuLinks = ({ links, ulClass, liClass, onLogout, onClose }) => {
  return (
    <ul className={ulClass}>
      {links.map(({ route, name, id, variant, color }) => (
        <li key={id} className={liClass}>
          {name === "Log Out" ? (
            <Button colorScheme={color} variant={variant} onClick={onLogout}>
              {name}
            </Button>
          ) : (
            <NavLink to={route}>
              <Button colorScheme={color} variant={variant} onClick={onClose}>
                {name}
              </Button>
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuLinks;
