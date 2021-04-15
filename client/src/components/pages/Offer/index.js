import React, {useState} from "react";
import axios from "axios";
import NFT from "../../NFT";
import {TreasurContract, web3, IERC20Contract} from "../../Web3Connect";
import {useSelector} from "react-redux";
import {
  Container,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
  HStack,
  Box,
  Button,
} from "@chakra-ui/react";
const index = () => {
  const [price, setPrice] = useState(0);
  const {address} = useSelector((state) => state.connectWallet);
  const {tokenURI} = useSelector((state) => state.Video);
  const handleOnChange = (e) => {
    setPrice(e.target.value);
  };
  const handleOnClick = async () => {
    const EthUsdPrice = await TreasurContract.methods.chainLinkPrice().call();
    const EthPrice = price / (EthUsdPrice * Math.pow(10, -8)).toPrecision(8);
    const approval = await IERC20Contract.methods
      .approve(
        TreasurContract.options.address,
        web3.utils.toWei(`${EthPrice.toPrecision(8)}`, "ether")
      )
      .send({from: address});
    const offer = await TreasurContract.methods
      .offer(
        web3.utils.utf8ToHex(tokenURI),
        web3.utils.toWei(`${EthPrice.toPrecision(8)}`, "ether")
      )
      .send({from: address});
    try {
      const tokenId = await axios.post("/mint", {
        tokenUri: web3.utils.utf8ToHex(tokenURI),
        tokenURIStr: tokenURI,
        tokenCreator: address,
      });
      console.log(tokenId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Container size="lg">
        <VStack>
          <NFT id={tokenURI} />
          <InputGroup>
            <InputLeftAddon children="$" />
            <Input placeholder="Enter Amount" onChange={handleOnChange} />
          </InputGroup>
          <Button style={mintButton} onClick={handleOnClick}>
            Place Offer
          </Button>
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
