import React, { useState, useEffect } from "react";
import CardList from "../../CardList";
import Navbar from '../../Navbar';
import {VStack, Box, Center } from "@chakra-ui/react";
import TextField from '../../TextField';
import { useSelector } from 'react-redux';
// import logo1 from "../../../assets/Logo.png";
const index = () => {
  const { address } = useSelector((state) => state.connectWallet);
  useEffect(() => {
    const inventoryapi = `https://api.covalenthq.com/v1/80001/address/${address}/balances_v2/?nft=true&no-nft-fetch=false`;
  }, []);
  return (
    <div style={centerContainer}>
      <VStack>
        <Center>
            <VStack>
          {/* <Box w="100%" h="40%">
              <img src={logo1} style={logo} />

            <Heading style={{fontFamily: " Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Treasur</Heading>
                <Text>TOKENIZE VIDEOS AS COLLECTIBLES AND SHOW OFF YOUR TRUE FANHOOD․</Text>
          </Box> */}
          <Box>
          <Navbar />
          </Box>
          <TextField />
          </VStack>
        </Center>
        <Box>
          <CardList />
        </Box>
      </VStack>
    </div>
  );
};

const logo = {
  margin: "25px",
  height: "120px",
  width: "31vw",
};

const centerContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default index;
