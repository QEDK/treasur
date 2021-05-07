import React, {useEffect, useState} from "react";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {getMyNFT} from '../../../store/actions/nftAction';
import {
  VStack,
  Box,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Center
} from "@chakra-ui/react";
import MyVideo from '../../MyVideo';

const index = () => {
  const dispatch = useDispatch();

  const {address} = useSelector((state) => state.connectWallet);
  const { avatar } = useSelector((state) => state.signIn);
  const [nfts, setNfts] = useState(null);
  useEffect(async () => {
    const inventoryapi = await axios.get(
      `https://api.covalenthq.com/v1/80001/address/${address}/balances_v2/?nft=true&no-nft-fetch=false`
    );
    const userNfts = inventoryapi.data.items.filter(
      (item) => (item.contract_address = 0x54b327694d71596128064b495c70fe9f0d2919ad)
    );
    
  }, []);
const mockData = [
    {
      yt_id: 'BS5rlPJnBoY',
      tokenid: null,
      status: 'offered',
      owner: null,
      creator: null,
      price: "$5",
    },
    {
      yt_id: 'qOAfL4SkWkw',
      tokenid: null,
      status: 'offered',
      owner: null,
      creator: null,
      price: "$23",
    },
    {
      yt_id: 'XqEC7RQpBQU',
      tokenid: null,
      status: 'offered',
      owner: null,
      creator: null,
      price: "$37",
    },
    {
      yt_id: 'z2NTw03udXM',
      tokenid: null,
      status: 'offered',
      owner: null,
      creator: null,
      price: "$45",
    },
    {
      yt_id: '9Uc-b-C0q3A',
      tokenid: null,
      status: 'offered',
      owner: null,
      creator: null,
      price: "$90",
    },
    {
      yt_id: 'nTy84Wq0UIU',
      tokenid: null,
      status: 'offered',
      owner: null,
      creator: null,
      price: "$100",
    },
    {
      yt_id: '7jL0iASfbxA',
      tokenid: null,
      status: 'offered',
      owner: null,
      creator: null,
      price: "$7",
    },
    {
      yt_id: 'test',
      tokenid: null,
      status: 'offered',
      owner: null,
      creator: null,
      price: "$23",
    }
  ]
  const getOwned = async () => {
      dispatch(getMyNFT(address));
  }

  const getMyVideos = async () => {
        console.log("GETTING VIDEOS");
        const rv = await axios.get("/myvideos");
        setNfts(rv);
  }
  return (
    <div>
      <VStack>
        <Box>
          <Image
            borderRadius="full"
            boxSize="150px"
            src={avatar}
            alt="Segun Adebayo"
            fallbackSrc="https://via.placeholder.com/150"
          />
        </Box>
        <Box width="100%">
          <Tabs size="lg" isLazy isFitted>
            <TabList mb="1em">
              <Tab onClick={getOwned}>Owned</Tab>
              <Tab>Bids</Tab>
              <Tab>My Videos</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                  <Center>
                <Text>You don't own any NFTs. Start bidding now!</Text>
                </Center>
              </TabPanel>
              <TabPanel>
                  <Center>
                <Text>You don't have any ongoing bids.</Text>
                </Center>
              </TabPanel>
              <TabPanel>
                  <Center>
                {/* <Text>Your videos awaiting approvals appear here.</Text> */}
                {/* {nfts != null ? nfts.forEach((nft) => <MyVideo uri={nft.yt_id} />) : <Text>Your videos will appear here</Text>} */}
                <VStack>
                {mockData.map((nft) => <Box><MyVideo uri={nft.yt_id} price={nft.price} creator={nft.creator} /></Box>)}
                </VStack>
                </Center>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </div>
  );
};

export default index;
