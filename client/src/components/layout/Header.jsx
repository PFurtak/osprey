import React, { Fragment, useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";
import AuthContext from '../../context/auth/authContext';
import DocContext from '../../context/doc/docContext';



const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);



const Header = props => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout } = authContext;

  const docContext = useContext(DocContext);
  const {clearDocs} = docContext;

  const onLogout = () => {
    logout();
    clearDocs();
  }

  const authLinks = (
    <Fragment>
    <span> Welcome, {user && user.firstName}!  </span>
      <span>
        <a onClick={onLogout} href='#!'>
        <Button variantColor="teal" border="1px">
           Sign Out 
        </Button>
        </a>
        </span>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <Link to='/signup'>
        <Button variantColor="teal" border="1px" marginRight="10px">
           Sign Up 
        </Button>
        </Link>

        <Link to='/signin'>
        <Button variantColor="teal" border="1px">
           Sign In 
        </Button>
        </Link>
    </Fragment>
  )

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
        <Link to='/'>Osprey</Link>
        </Heading>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems><Link to='/docs'>Docs</Link></MenuItems>
        <MenuItems><Link to='/issues'>Issues</Link></MenuItems>
        <MenuItems><Link to='/about'>About</Link></MenuItems>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Fragment>
          {isAuthenticated ? authLinks : guestLinks}
        </Fragment>
        
      </Box>
    </Flex>
  );
};

export default Header;