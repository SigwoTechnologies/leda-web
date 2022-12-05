import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AiOutlinePlus } from 'react-icons/ai';
import { findUserCollectionsWithoutItems } from '../../features/account/store/account.actions';
import { selectUserCollectionsWithoutItems } from '../../features/account/store/account.slice';
import useMetamask from '../../features/auth/hooks/useMetamask';
import { selectMarketplaceState } from '../../features/marketplace/store/marketplace.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { CollectionCreateType } from '../../types/collection-type';
import { ICollection } from '../../types/ICollection';

const collectionsErrors = {
  LongString: 'The collection must contains less than 13 characters (including spaces)',
  ShortString: 'The collection must contains at least 4 characters (including spaces)',
  AlreadyExists: 'This Collection already exist. Try creating another one',
};

const NftCollectionComponent = () => {
  const dispatch = useAppDispatch();
  const { address } = useMetamask();
  const [open, setOpen] = useState(false);
  const userCollections = useAppSelector(selectUserCollectionsWithoutItems);
  const [dropdownCollection, setDropdownCollection] = useState('');
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [selectedCollectionImage, setSelectedCollectionImage] = useState(null);
  const [hasImageCollectionError, setHasImageCollectionError] = useState(false);
  const [collectionInput, setCollectionInput] = useState({
    name: '',
    description: '',
  });
  const [collection, setCollection] = useState({
    name: '',
    description: '',
  } as CollectionCreateType);
  const [collectionError, setCollectionError] = useState('');

  useEffect(() => {
    dispatch(findUserCollectionsWithoutItems(address));
  }, [dispatch, address]);

  const handleDropdown = () => {
    setOpen((prev) => !prev);
  };

  const handleCollectionModal = () => {
    handleDropdown();
    setCollectionModalOpen((prev) => !prev);
  };

  const ref = useRef(null);

  const currentHandler = (item: string) => {
    setDropdownCollection(item);
    handleDropdown();
  };

  const existOnUserCollections = userCollections.find((col) => col.name === collectionInput.name);

  const handleSaveCollection = () => {
    if (collectionInput.name.length <= 3) setCollectionError(collectionsErrors.ShortString);
    if (collectionInput.name.length >= 13) setCollectionError(collectionsErrors.LongString);
    if (existOnUserCollections) setCollectionError(collectionsErrors.AlreadyExists);
    else if (
      collectionInput.name.length >= 4 &&
      collectionInput.name.length <= 13 &&
      !existOnUserCollections
    ) {
      const collectionDraft = {
        name: collectionInput.name,
        description: collectionInput.description,
      };

      setCollectionError('');
      setCollection(collectionDraft);
      setDropdownCollection(collectionInput.name);
      handleCollectionModal();
    }
  };

  const FilesAllowedCol = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
  const handleCollectionImageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const isAbleToAdd = FilesAllowedCol.find((type) => type === e.target.files[0].type);
      if (isAbleToAdd) {
        setSelectedCollectionImage(e.target.files[0]);
        setHasImageCollectionError(false);
      } else {
        setHasImageCollectionError(true);
      }
    }
  };

  return (
    <div className="input-box ">
      <label className="form-label">Collection *</label>
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
        <span className="current">{dropdownCollection || 'Assign a Collection'}</span>
        <ul
          className="list"
          role="menubar"
          onClick={(e) => e.stopPropagation()}
          onKeyPress={(e) => e.stopPropagation()}
        >
          <li
            data-value="Default Collection"
            className={clsx(
              'option',
              dropdownCollection === 'Default Collection' && 'selected focus'
            )}
            role="menuitem"
            onClick={() => currentHandler('Default Collection')}
            onKeyPress={(e) => e}
          >
            Default Collection
          </li>
          {userCollections
            .filter((col) => col.name !== 'LedaNFT')
            .map((userCollection) => (
              <li
                data-value="Default Collection"
                key={userCollection.id}
                className={clsx(
                  'option',
                  dropdownCollection === userCollection.name && 'selected focus'
                )}
                role="menuitem"
                onClick={() => {
                  currentHandler(userCollection.name);
                  setCollection({
                    name: userCollection.name,
                    description: userCollection.description,
                  });
                }}
                onKeyPress={(e) => e}
              >
                {userCollection.name}
              </li>
            ))}
          <li
            data-value="Create Collection"
            className={clsx(
              'option',
              dropdownCollection === 'Create Collection' && 'selected focus'
            )}
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
              <div>
                <label htmlFor="collection-file">Upload an image for the collection</label>
                <input
                  name="file"
                  id="collection-file"
                  type="file"
                  className="inputfile"
                  accept="image/*"
                  onChange={handleCollectionImageChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="collection-name">Enter a name for the Collection</label>
                <input
                  placeholder='e. g. "Fifa World Cup 2022"'
                  type="text"
                  onChange={(e) =>
                    setCollectionInput({
                      ...collectionInput,
                      name: e.target.value,
                    })
                  }
                  id="collection-name"
                  value={collectionInput.name}
                  className="props-input mt-2"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="collection-name">Enter a description for the collection</label>
                <textarea
                  placeholder='e. g. "The Fifa World Cup 2022 is the..."'
                  onChange={(e) =>
                    setCollectionInput({
                      ...collectionInput,
                      description: e.target.value,
                    })
                  }
                  id="collection-name"
                  value={collectionInput.description}
                  className="props-input mt-2"
                />
              </div>
              <button
                type="button"
                className="w-auto mt-5 addPropBtn"
                onClick={handleSaveCollection}
              >
                Save Collection
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default NftCollectionComponent;
