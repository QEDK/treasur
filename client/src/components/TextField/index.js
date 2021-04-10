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
        console.log(url)
            if(TreasurContract.methods. isOffered().call() || TreasurContract.methods.isMinted().call() || TreasurContract.methods.isListed().call()){
                console.log("Can't use this video, it's already there")
            }
    }
    return (
        <div>
            <Input variant="flushed" placeholder="Enter Youtube URL here" focusBorderColor="red.300" width="180%" onChange={onChange}/>
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
