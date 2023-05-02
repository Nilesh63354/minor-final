import { Box, Container, Text, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import React from 'react'
import Login from '../components/authentication/Login'

const Homepage = () => {
  return (
    <Container maxW={'xl'} centerContent>
        <Box
        display={'flex'}
        justifyContent={'center'}
        p={3}
        bg={'white'}
        w={'100%'}
        m={'40px 0 15px 0'}
        borderRadius={'lg'}
        borderWidth={'1px'}>
            <Text fontSize={'4xl'}  color={'black'}>BookisH</Text>
        </Box>
        <Box 
        bg={'white'}
        w={'100%'}
        borderRadius={'lg'}
        color={'black'}
        borderWidth={'1px'}
        padding={'15px'}>
            <Box 
            w={'98%'}
            bg={'green'}
            borderRadius={'lg'}
            color={'black'}
            borderWidth={'1px'}
            padding={'15px'}
            justifyContent={'center'}
            
            >
                <Text fontSize={'15px'} fontFamily={'Work sans'} color={'black'}  >Login Here</Text>
            </Box>
            <Login/>
        </Box>
    </Container>
  )
}

export default Homepage