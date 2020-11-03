import React, {Fragment} from 'react';
import DocForm from '../docs/DocForm';
import Docs from '../docs/Docs';
import {Heading} from '@chakra-ui/core'

const DocPage = () => {
    return (
       <Fragment> 
           <Heading ml={12} mt={6} >Site Documentation</Heading>
        <DocForm />
        <Docs />
        </Fragment>
    )
}

export default DocPage;