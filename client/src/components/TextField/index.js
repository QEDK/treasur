import React, { useState } from 'react'
import { Input, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { YTVideoContract, TreasurContract, web3, IERC20Contract } from '../Web3Connect'
import { useHistory } from 'react-router-dom';
const index = () => {
    const { address } = useSelector((state) => state.connectWallet)
    const [url, setUrl] = useState('');
    let history = useHistory();

    const onChange = (e) => {
        setUrl(e.target.value);
    }

    const onSubmit = async () => {
        // Call all the contract methods to check
        // if the video has been offered, listed or minted
        // if nothing out of these 3 then mint it.
        const yt_id = url.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]+).*/);
        if (yt_id !== null) {
            const tokenURI = web3.utils.utf8ToHex(yt_id[1]);
            if(await TreasurContract.methods.isOffered(tokenURI).call() ||
                await TreasurContract.methods.isMinted(tokenURI).call() ||
                await TreasurContract.methods.isListed(tokenURI).call()){
                // TODO: func calls returning promises
                // await them then put in if block
                console.log("Can't use this video, it's already there");
            }else{
                
                const approval = await IERC20Contract.methods.approve(TreasurContract.options.address, web3.utils.toWei("0.03", "ether")).send({"from": address})
                const offer = await TreasurContract.methods.offer(tokenURI, web3.utils.toWei("0.03", "ether") ).send({"from": address})
                console.log(approval)
                console.log(offer)
                history.push('/offer')
            }
        } else {
            console.log("Invalid URL");
        }
    }
    return (
        <div>
            <Input variant="flushed" placeholder="Enter YouTube URL here" focusBorderColor="red.300" width="180%" onChange={onChange}/>
            <Button style={mintButton} onClick={onSubmit}>Offer</Button>
        </div>
    )
}
const mintButton = {
    backgroundColor: "#281A03",
    color: "white",
    marginTop: "1rem"
}
export default index
