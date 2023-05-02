import React from 'react'
import {VStack , StackDivider,  FormControl, FormLabel, Input, InputGroup, InputRightElement, Button} from '@chakra-ui/react';
import { useState } from 'react';

const Login = () => {
    const [uid, setuid]=useState();
    const [pass, setpass] =useState();
    const [show, setshow]=useState(false);

    const handleClick = () => setshow(!show);

  return (
    <VStack
        // divider={<StackDivider borderColor='gray.200' />}
        spacing={'5px'}
        padding={'20px'}
        >
        <FormControl id='user-id' isRequired>
            <FormLabel>User Id.:</FormLabel>
            <Input
            placeholder='Enter Your User Id'
            onChange={(e)=> setuid(e.target.value)}/>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password:</FormLabel>
            <InputGroup>
                <Input
                type= {show ? 'text':'password'}
                placeholder='Enter Your Password'
                onChange={(e)=> setpass(e.target.value)}/>
                <InputRightElement width={"4.5rem"}>
                    <Button h={"1.75rem"} size={'sm'} onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
            
        </FormControl>

        <Button
        colorScheme='blue'
        width={"100%"}
        style={{marginTop: 15}}
        // onClick={submit}
        >Login</Button>

    </VStack>
  )
}

export default Login