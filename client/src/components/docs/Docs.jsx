import React, {Fragment, useContext, useEffect} from 'react';
import DocDocument from './DocDocument';
import DocContext from '../../context/doc/docContext';

const Docs = () => {
    const docContext = useContext(DocContext);
    const {docs, filtered, getDocs, loading} = docContext;

    useEffect(() => {
        getDocs();
        // eslint-disable-next-line
    },[]);

    if (docs !== null && docs.length === 0 && !loading) {
        return <h4>Please add a document</h4>
    }

    return (
        <Fragment>
          {docs !== null && !loading ? (
            <Fragment>
              {filtered !== null
                ? filtered.map((doc) => (
                      <DocDocument key={doc._id} doc={doc} />
                  ))
                : docs.map((doc) => (
                      <DocDocument key={doc._id} doc={doc} />
                  ))}
           </Fragment>
          ) : (
            <h2>Loading...</h2>
          )}
        </Fragment>
      );
}

export default Docs