import React, {useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import {TreasurContract, web3, IERC20Contract} from "../Web3Connect";
import {
  Text,
  SimpleGrid,
  Box,
  VStack,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  Alert,
  AlertIcon,
  useDisclosure,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import Timer from "../Timer";
import BidButton from "../BidButton";

const index = ({uri}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {address} = useSelector((state) => state.connectWallet);
  const property = {
    latestBid: 0.69,
    // Add a string if there's no auction.
    AuctionEndTime: "April 26 2021, 23:23:38",
  };
  const [bidPrice, setBidPrice] = useState(0);
  const handleOnChange = (e) => {
    setBidPrice(e.target.value);
  };

  const handleOnClick = async () => {
    // TODO : Make price > last bid price compulsory.
    try {
      const EthUsdPrice = await TreasurContract.methods.chainLinkPrice().call();
      const EthPrice = bidPrice / (EthUsdPrice * Math.pow(10, -8)).toPrecision(8);
      const approval = await IERC20Contract.methods
        .approve(
          TreasurContract.options.address,
          web3.utils.toWei(`${EthPrice.toPrecision(8)}`, "ether")
        )
        .send({from: address});
      const rv = await TreasurContract.methods
        .counterOffer(
          web3.utils.utf8ToHex(uri),
          web3.utils.toWei(`${(EthPrice.toPrecision(8))}`)
        )
        .send({from: address});
      const counterOfferMade = await axios.post("/counterOffer", {
        tokenURI: web3.utils.utf8ToHex(uri),
      })
      console.log(rv);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div style={boxStyle}>
      <SimpleGrid columns={2} spacing={10}>
        <Box style={innerBox}>
          <Text fontSize="1rem">Current Offer</Text>
          <Text fontSize="1.8rem">$5</Text>
          <Text fontSize="1.3rem">0.0023 WETH</Text>
        </Box>
        <Box style={innerBox}>
          <Text fontSize="1.8rem">Time to end</Text>
          {/* 
                    Discuss with Ankit about this functionality
                */}
          <Timer endDate={property.AuctionEndTime} />
        </Box>
      </SimpleGrid>
      {/* <BidButton text="Place a bid" /> */}

      <Button style={bidButton} onClick={onOpen}>
        Place a bid
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Place a bid</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Box>
                <Alert status="warning">
                  <AlertIcon />
                  This money will be deducted and will only be returned if there's a
                  higher bid than yours.
                </Alert>
              </Box>
              <Box>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="$"
                  />
                  <Input
                    focusBorderColor="#652B19"
                    placeholder="Enter amount"
                    onChange={handleOnChange}
                  />
                </InputGroup>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleOnClick} colorScheme="blackAlpha">
              Place bid
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

const innerBox = {
  borderRightStyle: "solid",
  borderRightWidth: "1px",
  margin: "25px 0px",
};
const boxStyle = {
  width: "30rem",
  margin: "4rem",
  borderRadius: "16px",
  boxShadow: "15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff",
};
const bidButton = {
  marginLeft: "7rem",
  width: "50%",
  borderRadius: "8px",
  background: "#281A03",
  color: "white",
  marginBottom: "10px",
  boxShadow: "15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff",
};

export default index;
