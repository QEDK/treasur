import React from "react";
import {HStack, Button} from "@chakra-ui/react";
import { AiOutlineShopping } from "react-icons/ai";
const index = () => {
  return (
    <>
      <HStack>
        <Button leftIcon={<AiOutlineShopping />} style={navButton} variant="solid">
          Marketplace
        </Button>
        <Button style={navButton} variant="outline">
          Mint
        </Button>
        <Button style={navButton} variant="ghost">
          Idk Buffer
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
