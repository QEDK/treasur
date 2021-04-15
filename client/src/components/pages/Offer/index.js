import React, { useState } from "react";
import NFT from "../../NFT";
import { TreasurContract, web3, IERC20Contract } from '../../Web3Connect'
import { useSelector } from 'react-redux';
import {
  Container,
  Input,
  InputGroup,
  VStack,
  Button,
  InputLeftElement
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
        const EthPrice = price/(EthUsdPrice * Math.pow(10, -8)).toPrecision(8);
        console.log(EthUsdPrice)
        console.log(EthPrice.toPrecision(8))
        console.log(TreasurContract.options.address)
        console.log(web3.utils.toWei(`${EthPrice.toPrecision(8)}`, "ether"))
        const approval = await IERC20Contract.methods.approve(TreasurContract.options.address, web3.utils.toWei(`${EthPrice.toPrecision(8)}`, "ether")).send({"from": address})
        const offer = await TreasurContract.methods.offer(web3.utils.utf8ToHex(tokenURI), web3.utils.toWei(`${EthPrice.toPrecision(8)}`, "ether") ).send({"from": address})
        console.log(approval)
        console.log(offer)
    }
  return (
    <div>
      <Container size="lg">
        <VStack>
          <NFT id={tokenURI} />
          <InputGroup style={input}>
            <InputLeftElement children="$" />
            <Input focusBorderColor="#652B19" placeholder="Enter Amount" onChange={handleOnChange} />
          </InputGroup>
        <Button style={mintButton} onClick={handleOnClick}>Place Offer</Button>
        </VStack>
      </Container>
    </div>
  );
};

const input = {
  marginTop: "2rem"
}
const mintButton = {
  backgroundColor: "#281A03",
  color: "white",
  margin: "2rem",
  width: "30%",
};

export default index;
