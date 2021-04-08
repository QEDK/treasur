import React from "react";
import {Flex, Button, Box, Spacer} from "@chakra-ui/react";
import {AiOutlineShopping} from "react-icons/ai";
import Login from "../Login";
import Logout from "../Logout";
import Web3Connect from '../Web3Connect'
import logo2 from "../../assets/logo2.svg";
const index = () => {
  return (
    <>
      <Flex direction="row" justify="space-evenly" wrap={true}>
        <Box style={margin}>
          <Button leftIcon={<AiOutlineShopping />} style={navButton} variant="solid">
            Marketplace
          </Button>
        </Box>
        <Box style={margin}>
          <Web3Connect />
        </Box>
        <Spacer />
        <img src={logo2} style={logoStyle} />
        <Spacer />
        <Box style={margin}>
          <Logout />
        </Box>
        <Spacer />
        <Box style={margin}>
          <Login />
        </Box>
      </Flex>
    </>
  );
};

const logoStyle = {}
const margin = {
  margin: "10px 1.5rem"
};
const navButton = {
  backgroundColor: "#281A03",
  color: "white",
};

export default index;
