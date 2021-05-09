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
    // const userNfts = inventoryapi.data.items.filter(
    //   (item) => (item.contract_address = 0x54b327694d71596128064b495c70fe9f0d2919ad)
    // );
  }, []);

  const getOwned = async () => {
      dispatch(getMyNFT(address));
  }

  const getMyVideos = async () => {
        console.log("GETTING VIDEOS");
        const rv = await axios.get("/myvideos");
        console.log(rv.data)
        setNfts(rv.data);
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
              <Tab onClick={getMyVideos}>My Videos</Tab>
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
                <VStack>
                { nfts != null ? nfts.map((nft) => <Box><MyVideo uri={nft.yt_id} price={nft.offervalue} creator={nft.offeraccount} /></Box>) : <Text>Loading....</Text>}
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
