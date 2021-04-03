import React from 'react';
import { Text, SimpleGrid, Box } from "@chakra-ui/react";
import BidButton from '../BidButton';

const index = () => {
    const property = {
        latestBid: 0.69,
        // Add a string if there's no auction.
        AuctionEndTime: "April 4 2021, 17:00 Hrs"
    }
    return (
        <div style={boxStyle}>
            <SimpleGrid columns={2} spacing={10}>
                <Box style={innerBox}>
            <Text fontSize="1rem">Current Bid</Text>
            <Text fontSize="1.8rem">0.69 Matic</Text>
            <Text fontSize="1.3rem">$420</Text>
            </Box>
            <Box style={innerBox}>
                <Text fontSize="1.8rem">Time to end</Text>
                {/* 
                    Discuss with Ankit about this functionality
                */}
            </Box>
            </SimpleGrid>
            <BidButton text="Place a bid" />
        </div>
    )
}

const innerBox = {
    borderRightStyle: "solid",
    borderRightWidth: "1px",
    margin: "25px 0px"
}
const boxStyle = {
    width: "30rem",
    margin: "4rem",
    borderRadius: "16px",
    boxShadow: "15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff",
  };

export default index
