import React from 'react';
import {Box, Flex, Heading, Grid, Badge, Text, Button} from '@chakra-ui/core'

const IssueCard = () => {
    return (
        
        <Flex width="full" align="center" justifyContent="center">
        <Box backgroundColor="blue.50" p={8} w="90%" borderWidth="1px" rounded="lg" borderRadius={8} borderColor="gray" boxShadow="lg" marginTop="20px" marginBottom="20px">
            <Flex flexDir="column" alignItems="flex-end">
            <Text mb={2} fontWeight="600">Nov 3, 2020</Text>
            <Badge borderRadius={3} p={2} backgroundColor="red.300" fontSize="0.9em">High Severity Level</Badge>
            </Flex>
            <Heading textAlign="center" as="h3" size="xl" mt={3} mb={3}>SVR2</Heading>
            <Badge borderRadius={3} p={2} backgroundColor="blue.100" fontSize="0.9em">Server</Badge>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <Box w="100%" mt="3" h="0" fontWeight="700"><p>Serial Number</p></Box>
                <Box w="100%" mt="3" h="0" fontWeight="700"><p>IP Address</p></Box>
                <Box w="100%" h="0" ><p>skdjfhskdjfh</p></Box>
                <Box w="100%" h="0" ><p>192.168.0.1</p></Box>
                <Box w="100%" h="0" mt="3" fontWeight="700"><p>Location</p></Box>
                <Box w="100%"></Box>
                <Box w="100%" h="0" ><p>room 212</p></Box>
                <Box w="100%" h="0" mt="3"></Box>
                <Box w="100%" h="0" ></Box>
            </Grid>
            <Box w="100%" mt="8" h="0" fontWeight="700"><p>Description: </p></Box>
            <Box w="100%" mb="8" mt="8" ><p>.....Problem description</p></Box>
            <Box w="100%" mt="8" h="0" fontWeight="700"><p>Comments: </p></Box>
            <Box w="100%" mb="8" mt="8" ><p>.....comments</p></Box>
            <Button>Add Comment</Button>
            <Button>Mark Resolved</Button>
        </Box>
     </Flex>
        
    )
}

export default IssueCard