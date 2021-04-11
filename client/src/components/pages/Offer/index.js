import React, { useState } from "react";
import NFT from "../../NFT";
import { TreasurContract, web3, IERC20Contract } from '../../Web3Connect'
import { useSelector } from 'react-redux';
import {
  Container,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
  HStack,
  Box,
  Button
} from "@chakra-ui/react";
const index = () => {
    const [price, setPrice] = useState(0)
    const { address } = useSelector((state) => state.connectWallet);
    const { tokenURI } = useSelector((state) => state.Video);
    const handleOnChange = (e) => {
        setPrice(e.target.value);
    }
    const handleOnClick = async () => {
        const EthUsdPrice = await TreasurContract.methods.chainLinkPrice().call()
        const EthPrice = 1/(EthUsdPrice * Math.pow(10, -8));
        console.log(EthPrice)
        const approval = await IERC20Contract.methods.approve(TreasurContract.options.address, web3.utils.toWei(`${EthPrice}`, "ether")).send({"from": address})
        const offer = await TreasurContract.methods.offer(tokenURI, web3.utils.toWei(`${EthPrice}`, "ether") ).send({"from": address})
        console.log(approval)
        console.log(offer)
    }
  return (
    <div>
      <Container size="lg">
        <VStack>
          <NFT id={tokenURI} />
          <InputGroup>
            <InputLeftAddon children="$" />
            <Input placeholder="Enter Amount" onChange={handleOnChange} />
          </InputGroup>
        <Button style={mintButton} onClick={handleOnClick}>Place Offer</Button>
        </VStack>
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
