import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import MenuLinks from "../MenuLinks/MenuLinks";
import { useRef } from "react";
import "./drawerMenu.css";

const MobileDrawer = ({ links }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton
        icon={<HamburgerIcon boxSize="25px" />}
        ref={btnRef}
        color="white"
        variant="plain"
        onClick={onOpen}
        aria-label="Open Menu"
        size="md"
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay bgColor="#22543D" />
        <DrawerContent color="white">
          <DrawerCloseButton />
          <DrawerHeader>MM</DrawerHeader>
          <DrawerBody>
            <MenuLinks
              links={links}
              ulClass="drawer-menu"
              liClass="drawer-item"
              onClose={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
