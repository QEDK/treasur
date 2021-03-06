import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container, Grid, GridItem, HStack, Box, Text} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import NFT from "../../NFT";
import Action from "../../Action";
import Information from "../../Information";

const index = () => {
  const {tokenURI} = useParams();
  const [offers, setOffers] = useState(null);
  useEffect(async () => {
    console.log(tokenURI);
    const history = await axios.get(`/history/${tokenURI}`);
    console.log("HISTORY", history);
    setOffers(history.data);
  }, []);

  // TODO
  // Highest offer price render
  // Convert that to WETH render
  return (
    <>
      <Grid
        h="800px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(1, 1fr)"
        gap={14}
      >
        <Container maxw="container.xl">
          <GridItem colSpan={2}>
            <NFT id={tokenURI} />
          </GridItem>
        </Container>
        <GridItem colSpan={2}>
          <HStack>
            <Box>
              <Action uri={tokenURI} />
            </Box>
            <Box>
              {/* TODO:
              Use offers array to render
              this dynamically.
            */}
              {offers &&
                offers.map((bid) => (
                  <Information
                    name={bid.offerName}
                    value={bid.offerValue}
                    avatar={bid.offerAvatar}
                  />
                ))}
              {/* <Information /> */}
            </Box>
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default index;
