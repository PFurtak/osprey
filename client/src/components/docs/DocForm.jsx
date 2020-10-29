import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DocContext from '../../context/doc/docContext';
import AuthContext from '../../context/auth/authContext';
import ErrorMessage from '../alert/ErrorMessage';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/core';

const DocForm = (props) => {
    const authContext = useContext(AuthContext);
    const { error, setLoading } = authContext;

    const docContext = useContext(DocContext);
    const { addDoc, updateDoc, clearCurrent, current } = docContext;

    useEffect(() => {
        if (current !== null) {
          setDoc(current);
        } else {
          setDoc({
            name: "",
            deviceSerialNumber: "",
            deviceType: "",
            deviceIP: "",
            deviceLocation: "",
            licenseStart: "",
            licenseExpire: "",
            notes: "",
          });
        }
      }, [docContext, current]);


      const [doc, setDoc] = useState({
            name: "",
            deviceSerialNumber: "",
            deviceType: "",
            deviceIP: "",
            deviceLocation: "",
            licenseStart: "",
            licenseExpire: "",
            notes: "",
      });

      const { name, deviceSerialNumber, deviceType, deviceIP, deviceLocation, licenseStart, licenseExpire, notes } = doc;

      const onChange = (e) => setDoc({ ...doc, [e.target.name]: e.target.value });

      const onSubmit = (e) => {
        setLoading();
        e.preventDefault();
          if (current !== null) {
              addDoc(doc);
          } else {
              updateDoc(doc)
          }
          clearAll()
        }
        const clearAll = () => {
            clearCurrent();
          };

    return (
        <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} borderColor="gray" boxShadow="lg" marginTop="60px" marginBottom="60px">
          <Box textAlign="center">
            <Heading>Add Document</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={onSubmit}>
            {error && <ErrorMessage error={error} />}
            <FormControl isRequired>
                <FormLabel>Device Name</FormLabel>
                <Input type="text" name="name" value={name} placeholder="Michael" size="lg" onChange={onChange}/>
              </FormControl>
              <FormControl mt={3} isRequired>
                <FormLabel>Serial Number</FormLabel>
                <Input type="text" name="deviceSerialNumber" value={deviceSerialNumber} placeholder="Scott" size="lg" onChange={onChange}/>
              </FormControl>
              <FormControl mt={3} isRequired>
                <FormLabel>Type</FormLabel>
                <Input type="text" name="deviceType" value={deviceType} placeholder="m.scott@paperco.com" size="lg" onChange={onChange}/>
              </FormControl>
              <FormControl mt={3} isRequired>
                <FormLabel>IP Address</FormLabel>
                <Input type="text" name="deviceIP" value={deviceIP} placeholder="*******" size="lg" onChange={onChange}/>
              </FormControl>
              <Button variantColor="teal" width="full" mt={4} type="submit">
                Submit
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

  export default DocForm;