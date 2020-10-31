import React, {useContext} from 'react'
import DocContext from '../../context/doc/docContext';
import PropTypes from 'prop-types';

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
          <div>
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
      )
}

DocDocument.propTypes = {
    doc: PropTypes.object.isRequired,
  };
  
  export default DocDocument;