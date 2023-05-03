import { Box, Container, Text } from '@chakra-ui/react'
import React from 'react'
import Login from '../components/authentication/Login'
import '../pages/Homepage.css'

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
            <Text className='tex' fontSize={'4xl'}  color={'black'}>BookisH</Text>
        </Box>
        <Box 
        bg={'white'}
        w={'100%'}
        borderRadius={'lg'}
        color={'black'}
        borderWidth={'1px'}
        padding={'15px'}>
            <Box
            className='cen'
            >
                <Text className='t'>Login Here</Text>
            </Box>
            <Login/>
        </Box>
    </Container>
  )
}

export default Homepage