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

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = event => {
      event.preventDefault();
      alert(`First: ${firstName} Last: ${lastName} Email: ${email} Password: ${password}`);
    };

    return (
        <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} borderColor="gray" boxShadow="lg" marginTop="60px" marginBottom="60px">
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
            <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input type="text" placeholder="Michael" size="lg" onChange={event => setFirstName(event.currentTarget.value)}/>
              </FormControl>
              <FormControl mt={3} isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" placeholder="Scott" size="lg" onChange={event => setLastName(event.currentTarget.value)}/>
              </FormControl>
              <FormControl mt={3} isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="m.scott@paperco.com" size="lg" onChange={event => setEmail(event.currentTarget.value)}/>
              </FormControl>
              <FormControl mt={3} isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="*******" size="lg" onChange={event => setPassword(event.currentTarget.value)} />
              </FormControl>
              <Button variantColor="teal" width="full" mt={4} type="submit">
                Sign Up
              </Button>
              <Flex justifyContent="center" alignContent="center" marginTop="15px">
                <Link to='/signin'>or sign in here</Link>
              </Flex>      
            </form>
          </Box>
        </Box>
      </Flex>
    );
  }