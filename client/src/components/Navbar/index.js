import React, { useEffect } from "react";
import {Flex, Button, Box, Spacer, useToast } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import {AiOutlineShopping} from "react-icons/ai";
import Login from "../Login";
import Logout from "../Logout";
import Web3Connect from '../Web3Connect'
import UserMenu from '../UserMenu'
import logo2 from "../../assets/logo2.svg";
const index = () => {

  const { isAuthenticated, givenName, avatar } = useSelector((state) => state.signIn)
  const toast = useToast();

  useEffect(() => {

    if(isAuthenticated){
      return toast({
        title: "Authorization Succesful.",
        description: "You've been successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      })

    }
  }, [isAuthenticated])
  return (
    <div style={navStyle}>
      <Flex direction="row" justify="flex-start" wrap={true}>
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
          {isAuthenticated ? <Logout /> : <Login />}
        </Box>
        <Spacer />
        <Box style={margin}>
         {isAuthenticated && <UserMenu name={givenName} picture={avatar}/>}
        </Box>
      </Flex>
    </div>
  );
};

const navStyle= {
  marginBottom: "3rem"
}

const logoStyle = {
  width: "20rem"
}
const margin = {
  margin: "10px 1.5rem"
};
const navButton = {
  backgroundColor: "#281A03",
  color: "white",
};

export default index;
