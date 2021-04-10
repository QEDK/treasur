import React, { useState } from 'react'
import { Input, Button } from '@chakra-ui/react';
import { YTVideoContract, TreasurContract } from '../Web3Connect'
const index = () => {
    const [url, setUrl] = useState('');

    const onChange = (e) => {
        setUrl(e.target.value);
    }

    const onSubmit = () => {
        // Call all the contract methods to check
        // if the video has been offered, listed or minted
        // if nothing out of these 3 then mint it.
        const yt_id = url.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]+).*/);
        if (yt_id !== null) {
            const tokenURI = web3.utils.utf8ToHex(yt_id[1]);
            if(TreasurContract.methods.isOffered(tokenURI).call() ||
                TreasurContract.methods.isMinted(tokenURI).call() ||
                TreasurContract.methods.isListed(tokenURI).call()){
                console.log("Can't use this video, it's already there");
            }
        } else {
            console.log("Invalid URL");
        }
    }
    return (
        <div>
            <Input variant="flushed" placeholder="Enter YouTube URL here" focusBorderColor="red.300" width="180%" onChange={onChange}/>
            <Button style={mintButton} onClick={onSubmit}>Mint</Button>
        </div>
    )
}
const mintButton = {
    backgroundColor: "#281A03",
    color: "white",
    marginTop: "1rem"
}
export default index
