import React, { useEffect, useState } from "react";
import { web3 } from '../Web3Connect';
import axios from "axios";
import {HStack, VStack, Box, Text, Image, Button, Spacer} from "@chakra-ui/react";
const index = ({uri, price, creator}) => {
  const [videoData, setVideoData] = useState(null)
  useEffect(async () => {
    const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${uri}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
    setVideoData(res.data.items[0]);
   console.log(res.data.items[0]);
},[])

const handleMint = async () => {
  await axios.post("/mint", {
    tokenURIStr: uri,
    tokenUri: web3.utils.utf8ToHex(uri),
    tokenCreator: `0xd1058ECCEE8102Bb8C1A7390b7d6Ea2CB6dA8E0e`
  })
}

const handleDeclineMint = async () => {
  const rv = await axios.post("/declineMint", {
    tokenUri: web3.utils.utf8ToHex(uri)
  })
}
  return (
    <div>
      <HStack>
        <Box>
          <Image
            boxSize="100px"
            objectFit="cover"
            src={`https://img.youtube.com/vi/${uri}/hqdefault.jpg`}
          ></Image>
        </Box>
        <Spacer />
        <Box>
          <VStack>
            <Box>
              <Text isTruncated style={{maxWidth: "10rem"}}>{videoData ? videoData.snippet.localized.title : 'Loading'}</Text>
            </Box>
            <Box>
              <Text>{price}</Text>
            </Box>
          </VStack>
        </Box>
        <Spacer />
        <Box>
          <Button style={{marginRight: "20px"}} onClick={handleMint} colorScheme="teal">Approve</Button>
          <Button colorScheme="red" onClick={handleDeclineMint}>Reject</Button>
        </Box>
      </HStack>
    </div>
  );
};

export default index;
