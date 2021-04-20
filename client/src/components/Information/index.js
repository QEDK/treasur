import React from 'react'
import { HStack, Box, Avatar, Text } from '@chakra-ui/react'

const index = () => {
    return (
        <div style={boxStyle}>
            <HStack spacing="20px">
                <Box style={innerBoxStyle} w="5rem">
                    <Avatar name="Sarthak Kundra" />
                </Box>
                <Box style={innerBoxStyle} w="25rem">
                    {/* 
                        Type: Bid || Listed || Minted
                        Type = "Bid" ? "Bid placed by {name}"
                        Type = "Listed" ? Listed by {name}
                    */}
                    <Text fontSize="1.3rem">
                        Video put up for auction
                    </Text>
                </Box>
                <Box style={innerBoxStyle} w="10rem">
                    <Text fontSize="1.8rem">
                        $5
                    </Text>
                </Box>
            </HStack>
        </div>
    )
}
const boxStyle = {
    width: "40rem",
    height: "6rem",
    margin: "4rem",
    borderRadius: "16px",
    boxShadow: "15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff",
};

const innerBoxStyle = {
    margin: "1.5rem 0.5rem"
}

export default index
