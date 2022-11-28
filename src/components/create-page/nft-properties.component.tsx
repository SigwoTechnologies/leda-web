import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ItemProperty } from '../../common/types/ipfs-types';
import { selectNftState } from '../../features/leda-nft/store/leda-nft.slice';
import { selectMarketplaceState } from '../../features/marketplace/store/marketplace.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';

const propertiesModalMessages = {
  NotRepeteadAllowed: 'You can not enter items with same key',
  ProvideData: 'Enter key and value',
  MaxLength: 'You can not enter more than 10 properties',
  MaxStrLength: 'Type shorter properties',
};

const initialPropsInputState = {
  key: '',
  value: '',
};

const NftPropertiesComponent = () => {
  const dispatch = useAppDispatch();
  const keyRef = useRef<HTMLInputElement>(null);
  const [properties, setProperties] = useState<ItemProperty[]>([]);
  const [propertiesModalMessage, setPropertiesModalMessage] = useState('');
  const [propsModalOpen, setPropsModalOpen] = useState(false);
  const [propsInput, setPropsInput] = useState(initialPropsInputState);
  const { isLoading } = useAppSelector(selectNftState);

  useEffect(() => {
    if (propsModalOpen) keyRef?.current?.focus();
  }, [propsModalOpen]);

  useEffect(() => {
    if (properties.length <= 10) setPropertiesModalMessage('');
  }, [properties]);

  const handlePropsModal = () => setPropsModalOpen((prev) => !prev);

  const handleAddMoreProps = (key: string, value: string) => {
    const itemsWithSameKey = properties.filter((prop: ItemProperty) => prop.key === key);

    if (itemsWithSameKey.length > 0) {
      setPropertiesModalMessage(propertiesModalMessages.NotRepeteadAllowed);
    } else if (key === '' || value === '') {
      setPropertiesModalMessage(propertiesModalMessages.ProvideData);
    } else if (properties.length >= 10) {
      setPropertiesModalMessage(propertiesModalMessages.MaxLength);
    } else if (key.length > 9 || value.length > 9) {
      setPropertiesModalMessage(propertiesModalMessages.MaxStrLength);
    } else {
      setPropertiesModalMessage('');
      setPropsInput(initialPropsInputState);
      setProperties([...properties, { key, value }]);
    }
  };

  const handleDeleteProp = (key: string) => {
    const found = properties.filter((prop: ItemProperty) => prop.key !== key);
    setProperties(found);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      if (propsInput.key === '' || propsInput.value === '') {
        setPropertiesModalMessage(propertiesModalMessages.ProvideData);
      }
      handleAddMoreProps(propsInput.key, propsInput.value);
      keyRef?.current?.focus();
    }
  };

  return (
    <>
      <div className="col-md-6">
        <div className="input-box">
          <label htmlFor="property" className="form-label">
            Properties
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center newPropertiesInput">
          <span style={{ color: '#A2A1B2' }}>
            {properties.length
              ? `${properties.length} ${properties.length === 1 ? 'property' : 'properties'} added`
              : 'Add Properties'}
          </span>
          <button
            type="button"
            onClick={handlePropsModal}
            className="w-auto"
            style={{ border: 'none' }}
          >
            <i className="feather-plus" style={{ fontSize: '20px' }} />
          </button>
        </div>
      </div>
      <Modal
        className="rn-popup-modal placebid-modal-wrapper"
        show={propsModalOpen}
        onHide={handlePropsModal}
        centered
      >
        <button type="button" className="btn-close" aria-label="Close" onClick={handlePropsModal}>
          <i className="feather-x" />
        </button>
        <Modal.Header>
          <h3 className="modal-title fw-light">
            <b>Add Properties</b>
          </h3>
        </Modal.Header>
        <SpinnerContainer isLoading={isLoading}>
          <Modal.Body>
            <p className="text-center">
              Properties show up underneath your item, are clickable, and can be filtered in your
              collection&apos;s sidebar.
            </p>
            {propertiesModalMessage ? (
              <span className="text-danger text-center mb-2">
                {propertiesModalMessage} <br />
              </span>
            ) : (
              <small>Press enter to add a property</small>
            )}

            {properties.map((property: ItemProperty) => (
              <div key={property.key} className="row align-items-center form-wrapper-three mb-4">
                <div className="col-md-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteProp(property.key)}
                    style={{
                      fontSize: '20px',
                      border: '1px solid alicelue',
                      paddingBlock: '8px',
                      borderRadius: '10px',
                    }}
                  >
                    <i className="feather-trash" style={{ fontSize: '20px' }} />
                  </button>
                </div>
                <div className="col-md-5">
                  <div className="input-box">
                    <input
                      type="text"
                      disabled
                      placeholder={property.key}
                      className="props-input"
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="input-box">
                    <input
                      type="text"
                      disabled
                      placeholder={property.value}
                      className="props-input"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="row align-items-center form-wrapper-two">
              <div className="col-md-2">
                <button
                  type="button"
                  onClick={() => setPropsInput(initialPropsInputState)}
                  style={{
                    fontSize: '20px',
                    border: '1px solid alicelue',
                    paddingBlock: '8px',
                    borderRadius: '10px',
                  }}
                >
                  <i className="feather-trash" style={{ fontSize: '20px' }} />
                </button>
              </div>
              <div className="col-md-5 mt-2">
                <input
                  onChange={(event) => {
                    setPropsInput((prevalue) => ({
                      ...prevalue,
                      key: event.target.value,
                    }));
                  }}
                  placeholder='e. g. "Hair"'
                  value={propsInput.key}
                  onKeyDown={handleKeyDown}
                  ref={keyRef}
                  type="text"
                  className="props-input"
                />
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  onChange={(event) => {
                    setPropsInput((prevalue) => ({
                      ...prevalue,
                      value: event.target.value,
                    }));
                  }}
                  onKeyDown={handleKeyDown}
                  className="props-input"
                  placeholder='e. g. "Long"'
                  value={propsInput.value}
                />
              </div>
            </div>
            <button
              type="button"
              className="w-auto mt-5 addPropBtn"
              onClick={() => handleAddMoreProps(propsInput.key, propsInput.value)}
            >
              Add Property
            </button>
          </Modal.Body>
        </SpinnerContainer>
      </Modal>
    </>
  );
};

export default NftPropertiesComponent;
