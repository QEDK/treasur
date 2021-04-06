import React from "react";
import Card from "../Card";
import { Wrap, WrapItem } from "@chakra-ui/react";
// TODO: Loop over all the data sent from the back-end
// Render 1 Card component for each object in the data.
const CardList = () => {
  return (
    <>

      <Wrap>
        <WrapItem>
          <Card />
        </WrapItem>
        <WrapItem>
          <Card />
        </WrapItem>
        <WrapItem>
          <Card />
        </WrapItem>
        <WrapItem>
          <Card />
        </WrapItem>
        <WrapItem>
          <Card />
        </WrapItem>
        <WrapItem>
          <Card />
        </WrapItem>
        </Wrap>

    </>
  );
};

export default CardList;
