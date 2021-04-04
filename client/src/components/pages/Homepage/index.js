import React from 'react'
import CardList from '../../CardList'
import { VStack, Box, Text, Center, Heading } from "@chakra-ui/react";

const index = () => {
    return (
        <>
        <VStack>
            <Center>
            <Box w="100%" h="40%">
                <Heading>Treasur</Heading>
                <Text>TOKENIZE VIDEOS AS COLLECTIBLES AND SHOW OFF YOUR TRUE FANHOOD․</Text>
            </Box>
            </Center>
            <Box>
            <CardList />
            </Box>
            </VStack>

        </>
    )
}

export default index
