import React from "react";
import NFT from "../../NFT";
import BidButton from "../../BidButton";
import {Container, Input, InputGroup, InputLeftAddon} from "@chakra-ui/react";
const index = () => {
  return (
    <div>
      <Container size="lg">
        <NFT />
        <BidButton style={mintButton} text="mint" />
        <InputGroup>
        <InputLeftAddon children="$" />
        <Input placeholder="Enter Amount" />
        </InputGroup>
      </Container>
    </div>
  );
};
const mintButton = {
  backgroundColor: "#281A03",
  color: "white",
  margin: "2rem",
  width: "30%",
};

export default index;
