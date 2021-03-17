import React from "react";

import {Grid, GridItem, Center} from "@chakra-ui/react";

const Card = () => {
  return (
    <div>
      <Grid
        h="400px"
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={3} bg="tomato">
          <Center>
            <h2>Video</h2>
          </Center>
        </GridItem>
        <GridItem colSpan={2} bg="tomato">
          <h5>Title</h5>
        </GridItem>
        <GridItem colSpan={2} bg="tomato">
          <h5>Creator</h5>
        </GridItem>
        <GridItem colSpan={2} bg="tomato">
          <h5>Price</h5>
        </GridItem>
        <GridItem colSpan={2} bg="tomato">
          <button>Bid page</button>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Card;
