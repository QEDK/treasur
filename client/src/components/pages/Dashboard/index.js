import React from "react";
import {Container, Grid, GridItem} from "@chakra-ui/react";

import NFT from "../../NFT";
import Action from '../../Action'
import Information from '../../Information'

const index = () => {
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
            <NFT />
          </GridItem>
        </Container>
        <GridItem colSpan={2} >
          {/* 
                TODO: Add the rest of the page here 
              */}
              <Action />
              <Information />
        </GridItem>
      </Grid>
    </>
  );
};

export default index;
