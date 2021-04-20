import React from "react";
import {
  Container,
  Grid,
  GridItem,
  HStack,
  Box
} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import NFT from "../../NFT";
import Action from "../../Action";
import Information from "../../Information";

const index = () => {

  const {tokenURI} = useParams();
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
            {/* 
                TODO: Change src to dynamic via props or state
              */}
            <NFT id={tokenURI} />
          </GridItem>
        </Container>
        <GridItem colSpan={2}>
          {/* 
                TODO: Add the rest of the page here 
              */}
              <HStack>
                <Box>
          <Action />
          </Box>
          <Box>
          <Information />
          </Box>
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default index;
