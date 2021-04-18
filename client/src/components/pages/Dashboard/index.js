import React from "react";
import {Container, Grid, GridItem} from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import NFT from "../../NFT";
import Action from '../../Action'
import Information from '../../Information'

const index = (props) => {
  const { tokenURI } = useParams();
  console.log(tokenURI)
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
