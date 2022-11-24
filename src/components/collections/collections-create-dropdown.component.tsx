import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import useMetamask from '../../features/auth/hooks/useMetamask';

type CollectionType = {
  owner: string;
  collectionName: string;
  address: string;
};

const collectionsErrors = {
  LongString: 'The collection must contains less than 13 characters (including spaces)',
  ShortString: 'The collection must contains at least 4 characters (including spaces)',
};

const CollectionsCreateDropdown = () => {
  const { address } = useMetamask();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [collectionInput, setCollectionInput] = useState('');
  const [collection, setCollection] = useState({
    owner: '',
    collectionName: '',
    address: '',
  } as CollectionType);
  const [collectionError, setCollectionError] = useState('');

  const handleDropdown = () => {
    setOpen((prev) => !prev);
  };

  const handleCollectionModal = () => {
    handleDropdown();
    setCollectionModalOpen((prev) => !prev);
  };

  const ref = useRef(null);

  const currentHandler = (item: string) => {
    setCurrent(item);
    handleDropdown();
  };

  const handleSaveCollection = () => {
    if (collectionInput.length <= 3) setCollectionError(collectionsErrors.ShortString);
    if (collectionInput.length >= 13) setCollectionError(collectionsErrors.LongString);
    else if (collectionInput.length >= 4 && collectionInput.length <= 12) {
      const collectionDraft = {
        owner: address,
        collectionName: collectionInput,
        address: 'LedaNFT',
      } as CollectionType;
      setCollectionError('');
      setCollection(collectionDraft);
      setCurrent(collectionInput);
      handleCollectionModal();
    }
  };

  return (
    <div
      className={clsx('nice-select d-flex align-items-center select-collections', open && 'open')}
      role="button"
      onClick={(e) => {
        e.stopPropagation();
        handleDropdown();
      }}
      tabIndex={0}
      onKeyPress={(e) => e}
      ref={ref}
    >
      <span className="current">{current || 'Assign a Collection'}</span>
      <ul
        className="list"
        role="menubar"
        onClick={(e) => e.stopPropagation()}
        onKeyPress={(e) => e.stopPropagation()}
      >
        <li
          data-value="Default Collection"
          className={clsx('option', current === 'Default Collection' && 'selected focus')}
          role="menuitem"
          onClick={() => currentHandler('Default Collection')}
          onKeyPress={(e) => e}
        >
          Default Collection
        </li>
        <li
          data-value="Create Collection"
          className={clsx('option', current === 'Create Collection' && 'selected focus')}
          role="menuitem"
          onClick={handleCollectionModal}
          onKeyPress={(e) => e}
        >
          <span className="d-flex align-items-center" style={{ gap: '5px' }}>
            <AiOutlinePlus />
            Create Collection
          </span>
        </li>
      </ul>
      <Modal
        className="rn-popup-modal placebid-modal-wrapper"
        show={collectionModalOpen}
        onHide={handleCollectionModal}
        centered
      >
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleCollectionModal}
        >
          <i className="feather-x" />
        </button>
        <Modal.Header>
          <h3 className="modal-title fw-light">
            <b>Create a Collection</b>
          </h3>
        </Modal.Header>
        <Modal.Body style={{ width: '100%' }}>
          <div className="align-items-center form-wrapper-two">
            {collectionError && <span className="text-danger">{collectionError}</span>}
            <div className="">
              <label htmlFor="collection-name">Enter a name for the Collection</label>
              <input
                placeholder='e. g. "Fifa World Cup 2022"'
                type="text"
                onChange={(e) => setCollectionInput(e.target.value)}
                id="collection-name"
                value={collectionInput}
                className="props-input mt-2"
              />
            </div>
            <button type="button" className="w-auto mt-5 addPropBtn" onClick={handleSaveCollection}>
              Save Collection
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CollectionsCreateDropdown;
