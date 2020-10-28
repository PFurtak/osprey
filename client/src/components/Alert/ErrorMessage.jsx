import React, {useContext} from 'react';
import { Box, Alert, AlertIcon, AlertDescription, CloseButton } from '@chakra-ui/core';
import AuthContext from '../../context/auth/authContext'


const ErrorMessage = ({ error }) => {
    const authContext = useContext(AuthContext);
    const { clearErrors } = authContext;

    const onClick = () => {
        clearErrors();
    }

  return (
    <Box my={4}>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{error}</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" onClick={onClick} />
      </Alert>
    </Box>
  );
}

export default ErrorMessage;