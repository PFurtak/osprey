import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import ErrorMessage from '../Alert/ErrorMessage';
import { Link } from 'react-router-dom';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/core';

const SignIn = (props) => {

  const authContext = useContext(AuthContext);
  const { login, error, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/docs');
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
      login({
        email,
        password,
      });
  };

    return (
        <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} borderColor="gray" boxShadow="lg" marginTop="60px" marginBottom="60px">
          <Box textAlign="center">
            <Heading>Sign In</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={onSubmit}>
            {error && <ErrorMessage error={error} />}
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={email} placeholder="test@test.com" size="lg" onChange={onChange}/>
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" value={password} placeholder="*******" size="lg" onChange={onChange} />
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

  export default SignIn