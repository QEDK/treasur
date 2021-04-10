import React, { useState } from 'react'
import { Input, Button } from '@chakra-ui/react';
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
    }
    return (
        <div>
            <Input variant="flushed" placeholder="Enter Youtube URL here" focusBorderColor="red.300" width="180%" onChange={onChange}/>
            <Button colorScheme="blue" onClick={onSubmit}>Mint</Button>
        </div>
    )
}

export default index
