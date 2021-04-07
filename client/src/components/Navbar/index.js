import React from "react";
import {HStack, Button} from "@chakra-ui/react";
import { AiOutlineShopping } from "react-icons/ai";
import Login from '../Login'
import Logout from '../Logout'
const index = () => {
  return (
    <>
      <HStack>
        <Button leftIcon={<AiOutlineShopping />} style={navButton} variant="solid">
          Marketplace
        </Button>
        <Button style={navButton} variant="outline">
          <Logout />
        </Button>
        <Button style={navButton} variant="ghost">
          <Login />
        </Button>
      </HStack>
    </>
  );
};

const navButton = {
    backgroundColor : "#281A03",
    color: "white"
}

export default index;
