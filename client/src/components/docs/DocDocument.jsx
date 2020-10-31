import React, {Fragment, useContext} from 'react';
import DocContext from '../../context/doc/docContext';
import PropTypes from 'prop-types';
import { Box, Heading, Flex, Badge } from '@chakra-ui/core';

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
            <Badge>{deviceType}</Badge>
      <p>Serial Number:  {deviceSerialNumber}</p> {' '}
      <p>IP Address:  {deviceIP}</p>
      <p>Location: {deviceLocation}</p>
      <p>License Start: {licenseStart}</p>
      <p>Licence Exipration: {licenseExpire}</p>
      <p>Notes: <br/> {notes}</p>
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