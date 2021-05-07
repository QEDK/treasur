import React from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  Avatar,
  HStack,
  Box,
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
const index = ({name, picture}) => {
  return (
    <Menu className={menuStyles}>
      <MenuButton as={Button} colorScheme="brand" rightIcon={<ChevronDownIcon />}>
        <HStack>
          <Box>
            <Avatar size="sm" name={name} src={picture} />
          </Box>
          <Box>Hello, {name}!</Box>
        </HStack>
      </MenuButton>
      <MenuList>
        <Link to="/profile"><MenuItem>Profile</MenuItem></Link>
        <MenuItem>My Collection</MenuItem>
      </MenuList>
    </Menu>
  );
};

const menuStyles = {
  backgroundColor: "#281A03",
  color: "white",
};
export default index;
