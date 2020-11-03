import React, {Fragment} from 'react';
import {Flex, Heading} from '@chakra-ui/core'
import IssueCard from '../../components/issues/IssueCard'

const Issues = () => {
    return (
        <Fragment>
        <Heading ml={12} mt={6} mb={6}>Issue Board</Heading>
        <Flex justifyContent="center">
        <IssueCard />
        </Flex>
        </Fragment>
    )
}

export default Issues;