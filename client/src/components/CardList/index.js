import React from "react";
import Card from "../Card";
import { useSelector } from 'react-redux';
import { Wrap, WrapItem } from "@chakra-ui/react";
// TODO: Loop over all the data sent from the back-end
// Render 1 Card component for each object in the data.
const CardList = () => {

  const { videos } = useSelector((state) => state.video)
  return (
    <>

      <Wrap>
        {/* <WrapItem>
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
        </WrapItem> */}
        {videos.forEach((video) => (
          <WrapItem>
            <Card URI={video} />
          </WrapItem>
        ))}
        </Wrap>

    </>
  );
};

export default CardList;
