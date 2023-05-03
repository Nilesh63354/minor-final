import React from 'react'
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'

export var idd = 'gbyb';

const Login = () => {
    const [show, setshow]=useState(false);
    const handleClick = () => setshow(!show);
    const toast = useToast();
    const [uid, setuid]=useState();
    const [pass, setpass] =useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    


  return (
    <VStack
        // divider={<StackDivider borderColor='gray.200' />}
        spacing={'5px'}
        padding={'20px'}
        >
 

        
<Form className='fo'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='h'>User Id</Form.Label>
        <Form.Control type="email" placeholder='Enter Your User Id'
            onChange={(e)=>{ setuid(e.target.value);
            }}/>
        <Form.Text className='h'>
          We'll never share your credentials with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='h'>Password</Form.Label>
        <Form.Control type= {show ? 'text':'password'}
                placeholder='Enter Your Password'
                onChange={(e)=>setpass(e.target.value)}/>
      </Form.Group>
    
<Button
className='f'
        variant="primary"
        colorScheme='blue'
        width={"100%"}
        style={{marginTop: 15}}
        onClick={()=>{
            // user = uid;
            
            setLoading(true);
        if(!uid || !pass){
            alert("Please fill the input fields");
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
      
        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = axios.post(
                "/api/user/login",
                { uid,pass },
                config
            );
                console.log(data);
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            console.log(data);
            // localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            idd=uid;
            console.log("idd:",idd);
            navigate("/logged");

        }catch(error){
            console.log(error);
        }
        
        }}
        isLoading={loading}
        >Login</Button>
    </Form>
    </VStack>
  )
}

export default Login