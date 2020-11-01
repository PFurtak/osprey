import React, {useContext} from 'react';
import DocContext from '../../context/doc/docContext';
import PropTypes from 'prop-types';
import { Box, Heading, Flex, Badge, Grid, Button } from '@chakra-ui/core';

const DocDocument = ({doc}) => {
    const docContext = useContext(DocContext);
    const {deleteDoc, setCurrent, clearCurrent} = docContext;

    const {
        _id,
        name,
        deviceSerialNumber,
        deviceType,
        deviceIP,
        deviceLocation,
        licenseStart,
        licenseExpire,
        notes,
      } = doc;

      const onDelete = () => {
        deleteDoc(_id)
        clearCurrent();
      };

      return (
        
        <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxW="lg" borderWidth="1px" rounded="lg" borderRadius={8} borderColor="gray" boxShadow="lg" marginTop="20px" marginBottom="20px">
            <Heading textAlign="center" as="h3" size="lg">{name}</Heading>
            <Badge fontSize="0.9em">{deviceType}</Badge>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <Box w="100%" mt="3" h="0" fontWeight="700"><p>Serial Number</p></Box>
                <Box w="100%" mt="3" h="0" fontWeight="700"><p>IP Address</p></Box>
                <Box w="100%" h="0"><p>{deviceSerialNumber}</p></Box>
                <Box w="100%" h="0"><p>{deviceIP}</p></Box>
                <Box w="100%" mt="8" h="0" fontWeight="700"><p>Location</p></Box>
                <Box w="100%" mt="3" h="0" fontWeight="700"><p>License Start</p></Box>
                <Box w="100%" h="0"><p>{deviceLocation}</p></Box>
                <Box w="100%" mt={-5} h="0"><p>{licenseStart}</p></Box>
                <Box w="100%" mt="3" h="8" fontWeight="700"><p>Licence Exipration</p></Box>
                <Box w="100%" mt="8"></Box>
                <Box w="100%" mt={-8} h="0"><p>{licenseExpire}</p></Box>
            </Grid>
            <Box w="100%" mt="8" h="0" fontWeight="700"><p>Notes: </p></Box>
            <Box w="100%" mb="8" mt="8" ><p>{notes}</p></Box>
            <Button onClick={() => setCurrent(doc)} variantColor='teal' width="100%">Edit</Button>
            <Button onClick={onDelete} variantColor='red' color="white" mt="4" width="100%">Delete</Button>
        </Box>
     </Flex>
        
        

  
     
     

     /*     <div>
              <ul>
      <li>{name}</li>
      <li>{deviceSerialNumber}</li>
      <li>{deviceType}</li>
      <li>{deviceIP}</li>
      <li>{deviceLocation}</li>
      <li>{licenseStart}</li>
      <li>{licenseExpire}</li>
      <li>{notes}</li>
              </ul>
         <button
          onClick={() => setCurrent(doc)}>
          Edit
        </button>
        <button onClick={onDelete}>
          Delete
        </button>
          </div>
          */
      )
}

DocDocument.propTypes = {
    doc: PropTypes.object.isRequired,
  };
  
  export default DocDocument;