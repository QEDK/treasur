import React, {useEffect} from "react";
import axios from "axios";
import CardList from "../../CardList";
import {VStack, Box, Center} from "@chakra-ui/react";
import TextField from "../../TextField";
import {useSelector} from "react-redux";
const index = () => {
  const {address} = useSelector((state) => state.connectWallet);

  useEffect(async () => {
    const inventoryapi = `https://api.covalenthq.com/v1/80001/address/${address}/balances_v2/?nft=true&no-nft-fetch=false`;
    
  }, []);

  
  return (
    <div style={centerContainer}>
      <VStack>
        <Center>
          <VStack>
            <Box></Box>
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
