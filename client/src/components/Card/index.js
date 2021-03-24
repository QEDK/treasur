import React from "react";

import {Grid, GridItem, Center, AspectRatio, Text, Button} from "@chakra-ui/react";
import {PlusSquareIcon} from "@chakra-ui/icons";

// TODO: Get URL, Price, Name as props
// Make all the text generic
const Card = () => {
  return (
    <div>
      <Grid
      style={boxStyle}
        h="400px"
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={3}>
          <AspectRatio maxW="600px" maxH="200px" ratio={1}>
            <Center>
              <iframe
                style={{marginLeft: "50%", display: "block"}}
                title="naruto"
                src="https://www.youtube.com/embed/QhBnZ6NPOY0"
                allowFullScreen
              />
            </Center>
          </AspectRatio>
        </GridItem>
        <GridItem colSpan={2}>
          <Text fontSize="2xl" isTruncated>
            Naruto some shit
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
          <Text fontSize="2xl" isTruncated>
            Creator name
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
          <Text fontSize="2xl" isTruncated>
            $69,420
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
          <Button leftIcon={<PlusSquareIcon />} colorScheme="teal" variant="solid">
            Bid
          </Button>
        </GridItem>
      </Grid>
    </div>
  );
};

// TODO: Add less margin for mobile view (Media Query)
const boxStyle = {
  margin: "4rem",
  borderRadius: "16px",
  boxShadow:  "15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff"
}
export default Card;
