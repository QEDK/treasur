import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "../Card";
import {Wrap, WrapItem, Text, usePinInputDescendantsContext} from "@chakra-ui/react";

const CardList = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(async () => {
    const videos = await loadData();
    setVideoList(videos);
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get("/live");
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return videoList ? (
    <>
      <Wrap>
        {videoList.map((video, index) => (
          <WrapItem>
            <Card key={index} URI={video.yt_id} />
          </WrapItem>
        ))}
      </Wrap>
    </>
  ) : (
    <Text>Error loading DB</Text>
  );
};

export default CardList;
