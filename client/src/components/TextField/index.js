import React, {useState} from "react";
import {Input, Button, useToast} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {placeOffer} from "../../store/actions/VideoAction";
import {TreasurContract, web3} from "../Web3Connect";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

const index = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {isAuthenticated} = useSelector((state) => state.signIn);
  const [url, setUrl] = useState("");
  let history = useHistory();

  const onChange = (e) => {
    setUrl(e.target.value);
  };

  const onSubmit = async () => {
    if (!isAuthenticated){
      return(toast({
        title: "Unauthorized",
        status: "error",
        description: "Please log in first.",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      })
)
    } else {
      // Call all the contract methods to check
      // if the video has been offered, listed or minted
      // if nothing out of these 3 then mint it.
      const yt_id = url.match(
        /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]+).*/
      );
      if (yt_id !== null) {
        const tokenURI = web3.utils.utf8ToHex(yt_id[1]);
        if (
          (await TreasurContract.methods.isOffered(tokenURI).call()) ||
          (await TreasurContract.methods.isMinted(tokenURI).call()) ||
          (await TreasurContract.methods.isListed(tokenURI).call())
        ) {
          console.log("Can't use this video, it's already there");
          console.log(await TreasurContract.methods.isMinted(tokenURI).call())
        } else {
         
          dispatch(placeOffer(yt_id[1]));
          history.push("/offer");
        }
      } else {
        console.log("Invalid URL");
      }
    }
  };
  return (
    <div>
      <Input
        focusBorderColor="#652B19"
        variant="flushed"
        placeholder="Enter YouTube URL here"
        width="180%"
        onChange={onChange}
      />
      <Button style={mintButton} onClick={onSubmit}>
        List
      </Button>
    </div>
  );
};
const mintButton = {
  backgroundColor: "#281A03",
  color: "white",
  marginTop: "1rem",
  marginLeft: "50%",
};
export default index;
