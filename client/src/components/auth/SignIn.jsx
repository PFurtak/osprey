import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/core';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = event => {
      event.preventDefault();
      alert(`Email: ${email} & Password: ${password}`);
    };

    return (
        <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} borderColor="gray" boxShadow="lg" marginTop="60px">
          <Box textAlign="center">
            <Heading>Sign In</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="test@test.com" size="lg" onChange={event => setEmail(event.currentTarget.value)}/>
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="*******" size="lg" onChange={event => setPassword(event.currentTarget.value)} />
              </FormControl>
              <Button variantColor="teal" width="full" mt={4} type="submit">
                Sign In
              </Button>
              <Flex justifyContent="center" alignContent="center" marginTop="15px">
                <Link to='/signup'>or sign up here</Link>
              </Flex>      
            </form>
          </Box>
        </Box>
      </Flex>
    );
  }