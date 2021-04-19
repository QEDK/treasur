import React from "react";
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
import Timer from '../Timer'
import BidButton from "../BidButton";

const index = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const property = {
    latestBid: 0.69,
    // Add a string if there's no auction.
    AuctionEndTime: "April 20 2021, 15:37:25",
  };
  return (
    <div style={boxStyle}>
      <SimpleGrid columns={2} spacing={10}>
        <Box style={innerBox}>
          <Text fontSize="1rem">Current Bid</Text>
          <Text fontSize="1.8rem">No bids</Text>
          <Text fontSize="1.3rem">$0</Text>
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
              This money deducted will not be returned if you're the highest bidder.
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
              <Input focusBorderColor="#652B19" placeholder="Enter amount" />
            </InputGroup>
            </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red">Place bid</Button>
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
