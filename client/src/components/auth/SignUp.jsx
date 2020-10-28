import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/core';

const SignUp = (props) => {

    const authContext = useContext(AuthContext);
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
          props.history.push('/docs');
        }
        // eslint-disable-next-line
      }, [error, isAuthenticated, props.history]);


    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });

      const { firstName, lastName, email, password } = user;

      const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

      const onSubmit = (e) => {
        e.preventDefault();
          register({
            firstName,
            lastName,
            email,
            password,
          });
        }

    return (
        <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} borderColor="gray" boxShadow="lg" marginTop="60px" marginBottom="60px">
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={onSubmit}>
            <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input type="text" name="firstName" value={firstName} placeholder="Michael" size="lg" onChange={onChange}/>
              </FormControl>
              <FormControl mt={3} isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" name="lastName" value={lastName} placeholder="Scott" size="lg" onChange={onChange}/>
              </FormControl>
              <FormControl mt={3} isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={email} placeholder="m.scott@paperco.com" size="lg" onChange={onChange}/>
              </FormControl>
              <FormControl mt={3} isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" value={password} placeholder="*******" size="lg" onChange={onChange}/>
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

  export default SignUp;