import React, { useState, useContext, useEffect } from 'react';
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
  Button,
  Textarea
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
        e.preventDefault();
        setLoading();
          if (current === null) {
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
                <Input type="text" name="name" value={name} size="lg" onChange={onChange}/>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Serial Number</FormLabel>
                <Input type="text" name="deviceSerialNumber" value={deviceSerialNumber} size="lg" onChange={onChange}/>
              </FormControl>
              <FormControl mt={3} isRequired>
                <FormLabel>Type</FormLabel>
                <Input type="text" name="deviceType" value={deviceType} size="lg" onChange={onChange}/>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>IP Address</FormLabel>
                <Input type="text" name="deviceIP" value={deviceIP} placeholder="192.168.0.1" size="lg" onChange={onChange}/>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Location</FormLabel>
                <Input type="text" name="deviceLocation" value={deviceLocation} placeholder="2nd floor server closet" size="lg" onChange={onChange}/>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>License Start Date</FormLabel>
                <Input type="text" name="licenseStart" value={licenseStart} placeholder="12/12/2027" size="lg" onChange={onChange}/>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>License End Date</FormLabel>
                <Input type="text" name="licenseExpire" value={licenseExpire} placeholder="12/12/2030" size="lg" onChange={onChange}/>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Notes</FormLabel>
                <Textarea name="notes" value={notes} placeholder="Notes..." size="lg" onChange={onChange}/>
              </FormControl>
              <Button variantColor="teal" width="full" mt={4} type="submit">
                Add Document
              </Button>     
            </form>
          </Box>
        </Box>
      </Flex>
    );
  }

  export default DocForm;