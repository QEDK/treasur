import React from "react";

import {
  Grid,
  GridItem,
  Center,
  Text,
  Image,
  HStack,
  Box,
  Avatar,
  VStack,
} from "@chakra-ui/react";
import {IoMdThumbsDown, IoMdThumbsUp} from "react-icons/io";
import {Fade, AttentionSeeker, Zoom} from "react-awesome-reveal";
import BidButton from '../BidButton';

// TODO: Get URL, Price, Name as props
// Make all the text generic
const Card = () => {
  return (
    <div>
      <Fade cascade>
        <Grid
          style={boxStyle}
          h="400px"
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={3}>
            <Center>
              {/* 
              Youtube image URL Format :-
              https://img.youtube.com/vi/<insert-youtube-video-id-here>/hqdefault.jpg
              TODO: Add a cleanup method to get the video ID
              TOD: Insert the id in the url to dynamically render images
               */}
              <Image
                style={thumbnail}
                src="https://img.youtube.com/vi/tfSS1e3kYeo/hqdefault.jpg"
                objectFit="cover"
              />
            </Center>
          </GridItem>
          <GridItem colSpan={2}>
            <VStack align="stretch">
              <Text fontSize="2xl" isTruncated>
                Highest in the Room
              </Text>
              <Zoom>
                <Text>
                  <b>$420</b>{" "}
                </Text>
              </Zoom>
            </VStack>
          </GridItem>
          <GridItem colSpan={2}>
            <HStack style={likes} spacing="0.1em">
              <Box style={{marginTop: "4px"}} w="20px" h="40px">
                <IoMdThumbsUp />
              </Box>
              <Box w="50px" h="40px">
                998k
              </Box>
              <Box style={{marginTop: "8px"}} w="20px" h="40px">
                <IoMdThumbsDown />
              </Box>
              <Box w="50px" h="40px">
                35k
              </Box>
            </HStack>
          </GridItem>
          <GridItem colSpan={2}>
            <HStack spacing="1.8rem">
              <Box w="30px" h="40px">
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              </Box>
              <VStack align="stretch">
                <Box w="150px" h="20px">
                  <Text>Travis Scott</Text>
                </Box>
                <Box w="150px" h="20px">
                  <Text>4.96M</Text>
                </Box>
              </VStack>
            </HStack>
          </GridItem>
          <GridItem colSpan={2}>
              {/* <Button style={bidButton} leftIcon={<PlusSquareIcon />} variant="solid">
                Bid
              </Button> */}
              <BidButton text="Bid" />
          </GridItem>
        </Grid>
      </Fade>
    </div>
  );
};

// TODO: Add less margin for mobile view (Media Query)
const boxStyle = {
  margin: "4rem",
  borderRadius: "16px",
  boxShadow: "15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff",
};

const thumbnail = {
  marginTop: "2rem",
  marginLeft: "3rem",
  height: "10rem",
  width: "13rem",
};

const likes = {
  marginLeft: "1rem",
};

export default Card;
