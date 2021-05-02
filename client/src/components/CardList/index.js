import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "../Card";
import {Wrap, WrapItem, Text} from "@chakra-ui/react";

const CardList = () => {
  const [videoList, setVideoList] = useState([]);
  let listItems;
  useEffect(async () => {
    const videos = await loadData();
    // console.log("VIDEOS", videos[0].yt_id);
    setVideoList(videos);
    listItems = videos.forEach((video) => {
      <WrapItem>
        <Card URI={video.yt_id} />
      </WrapItem>;
    });
    console.log(listItems);
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get("/live");
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  console.log(listItems);
  return videoList ? (
    <>
      <Wrap>
        {videoList.map((video) => (
          <WrapItem>
            <Card URI={video.yt_id} />
          </WrapItem>
        ))}
      </Wrap>
    </>
  ) : (
    <Text>Error loading DB</Text>
  );
};

export default CardList;
