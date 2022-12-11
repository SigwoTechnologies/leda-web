// TODO: This needs a refactor at all
import { ItemRequest } from '@types';
import { useForm } from 'react-hook-form';
import Button from '@ui/button';
import ErrorText from '@ui/error-text';
import Image from 'next/image';
import ProductModal from '@components/modals/product-modal';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import TagsInput from 'react-tagsinput';
import Modal from 'react-bootstrap/Modal';
import clsx from 'clsx';
import { AiOutlinePlus } from 'react-icons/ai';
import { useClickAway } from 'react-use';
import Switch from 'react-switch';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { getFormattedName } from '@utils/getFormattedName';
import { mintNft } from '../../features/leda-nft/store/leda-nft.actions';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { selectNftState } from '../../features/leda-nft/store/leda-nft.slice';
import useMetamask from '../../features/auth/hooks/useMetamask';
import { ItemProperty } from '../../common/types/ipfs-types';
import { findUserCollectionsWithoutItems } from '../../features/account/store/account.actions';
import { selectUserCollectionsWithoutItems } from '../../features/account/store/account.slice';
import { CollectionCreateType } from '../../types/collection-type';
import { withAuthProtection } from '../../features/auth/store/auth.actions';

const tagsErrorMessages = {
  CantMore: 'You can not enter more than 8 tags',
  AtLeast: 'Please enter at least 1 tag',
  LenghtNotAllowed: 'Too long tag. Try with a tag that contains less than 8 characters',
};

const initialPropsInputState = {
  key: '',
  value: '',
};

const propertiesModalMessages = {
  NotRepeteadAllowed: 'You can not enter items with same key',
  ProvideData: 'Enter key and value',
  MaxLength: 'You can not enter more than 10 properties',
  MaxStrLength: 'Type shorter properties',
};

const collectionsErrors = {
  LongString: 'The collection name must contains less than 35 characters (including spaces)',
  ShortString: 'The collection name must contains at least 4 characters (including spaces)',
  AlreadyExists: 'This Collection already exist. Try creating another one',
  LongDescription:
    'The collection description must contains less than 255 characters (including spaces)',
  ShortDescription:
    'The collection description must contains at least 5 characters (including spaces)',
  ProvideImage: 'Please provide an image for the collection',
  UnvailableName: 'This name is not available. Try with another one!',
  NotAvailableToSubmit: 'Please choose a collection before submitting',
};

const defaultCollection = {
  blob: null,
  name: '',
  description: '',
} as CollectionCreateType;

const CreateNewArea = () => {
  const userCollections = useAppSelector(selectUserCollectionsWithoutItems);
  const [properties, setProperties] = useState<ItemProperty[]>([]);
  const [propertiesModalMessage, setPropertiesModalMessage] = useState('');
  const [propsModalOpen, setPropsModalOpen] = useState(false);
  const [propsInput, setPropsInput] = useState(initialPropsInputState);
  const [isLazy, setIsLazy] = useState(false);

  const dispatch = useAppDispatch();
  const { address } = useMetamask();
  const { isLoading } = useAppSelector(selectNftState);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasImageError, setHasImageError] = useState(false);
  const [hasImageTypeError, setHasImageTypeError] = useState(false);
  const [previewData, setPreviewData] = useState({} as ItemRequest);
  const [tags, setTags] = useState<string[]>([]);
  const [tagErrMessage, setTagErrMessage] = useState('');
  const keyRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [dropdownCollection, setDropdownCollection] = useState('');
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [collectionImageName, setCollectionImageName] = useState('');
  const [collectionSubmitError, setCollectionSubmitError] = useState('');
  const [collectionInput, setCollectionInput] = useState({
    blob: null,
    name: '',
    description: '',
  });
  const [collection, setCollection] = useState({
    blob: null,
    name: '',
    description: '',
  } as CollectionCreateType);
  const [collectionError, setCollectionError] = useState('');
  const collectionsDropdownRef = useRef(null);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  useClickAway(collectionsDropdownRef, onClose);

  useEffect(() => {
    dispatch(findUserCollectionsWithoutItems(address));
  }, [dispatch, address]);

  const handleCollectionModal = () => {
    setCollectionModalOpen((prev) => !prev);
    onClose();
  };

  const currentHandler = (item: string) => {
    setDropdownCollection(item);
    onClose();
  };

  const existOnUserCollections = userCollections.find((col) => col.name === collectionInput.name);

  const handleDefaultCollection = () => {
    setCollection(defaultCollection);
    currentHandler('Default Collection');
  };

  const handleSaveCollection = () => {
    if (collectionInput.name.length <= 3) setCollectionError(collectionsErrors.ShortString);
    if (collectionInput.name.length >= 35) setCollectionError(collectionsErrors.LongString);
    if (collectionInput.description.length <= 5)
      setCollectionError(collectionsErrors.ShortDescription);
    if (collectionInput.description.length > 255)
      setCollectionError(collectionsErrors.LongDescription);
    if (collectionInput.blob === null) setCollectionError(collectionsErrors.ProvideImage);
    if (collectionInput.name.toLowerCase() === 'ledanft')
      setCollectionError(collectionsErrors.UnvailableName);

    if (existOnUserCollections) setCollectionError(collectionsErrors.AlreadyExists);
    else if (
      collectionInput.name.length >= 4 &&
      collectionInput.name.length <= 35 &&
      collectionInput.description.length >= 5 &&
      collectionInput.description.length <= 255 &&
      collectionInput.blob !== null &&
      collectionInput.name.toLowerCase() !== 'ledanft' &&
      !existOnUserCollections
    ) {
      const collectionDraft = {
        blob: collectionInput.blob,
        image: {
          url: '',
          cid: '',
        },

        name: collectionInput.name,
        description: collectionInput.description,
      };

      setCollectionError('');
      setCollection(collectionDraft);
      setDropdownCollection(collectionInput.name);
      handleCollectionModal();
    }
  };

  const handlePropsModal = () => setPropsModalOpen((prev) => !prev);

  const handleLazyChecked = () => setIsLazy((prev) => !prev);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemRequest>({
    mode: 'onChange',
  });

  const handleProductModal = () => {
    setShowProductModal(false);
  };

  const FilesAllowed = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

  // This function will be triggered when the file field change
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const isAbleToAdd = FilesAllowed.find((type) => type === e.target.files[0].type);
      if (isAbleToAdd) {
        setSelectedImage(e.target.files[0]);
        setHasImageTypeError(false);
      } else {
        setHasImageTypeError(true);
      }
    }
  };

  const handleCollectionImageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const isAbleToAdd = FilesAllowed.find((type) => type === e.target.files[0].type);
      if (isAbleToAdd) {
        setCollectionInput({ ...collectionInput, blob: e.target.files[0] });
        setCollectionImageName(e.target.files[0].name);
      }
    }
  };

  const onSubmit = async (data: ItemRequest, e: any) => {
    const collectionSelected = dropdownCollection !== '';
    const { target } = e;
    const submitBtn = target.localName === 'span' ? target.parentElement : target;
    const isPreviewBtn = submitBtn.dataset?.btn;
    setHasImageError(!selectedImage);
    const longTags = tags.filter((tag) => tag.length >= 8);

    if (!collectionSelected) setCollectionSubmitError(collectionsErrors.NotAvailableToSubmit);
    if (longTags.length) setTagErrMessage(tagsErrorMessages.LenghtNotAllowed);
    if (tags.length > 8) setTagErrMessage(tagsErrorMessages.CantMore);
    if (tags.length === 0) setTagErrMessage(tagsErrorMessages.AtLeast);
    if (isPreviewBtn && selectedImage) {
      setPreviewData({ ...data, blob: selectedImage });
      setShowProductModal(true);
    }

    if (
      !isPreviewBtn &&
      selectedImage &&
      collectionSelected &&
      tags.length &&
      tags.length <= 8 &&
      !longTags.length
    ) {
      dispatch(
        withAuthProtection(
          mintNft({
            ...data,
            isLazy,
            address,
            collection,
            blob: selectedImage,
            tags,
            itemProperties: properties,
          } as ItemRequest)
        )
      );
    }
  };

  const handleTagsChange = (tagProps: string[]) => {
    // prevent empty tags
    if (!tagProps.includes('')) setTags(tagProps);
  };

  useEffect(() => {
    if (dropdownCollection !== '') setCollectionSubmitError('');
  }, [dropdownCollection]);

  useEffect(() => {
    if (propsModalOpen) keyRef?.current?.focus();
  }, [propsModalOpen]);

  useEffect(() => {
    if (tags.length <= 8) {
      setTagErrMessage('');
    }
  }, [tags]);

  useEffect(() => {
    if (properties.length <= 10) setPropertiesModalMessage('');
  }, [properties]);

  return (
    <>
      <div className="create-area rn-section-gapTop" style={{ minHeight: '100vh' }}>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <SpinnerContainer isLoading={isLoading}>
              <div className="row g-5">
                <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                  <div className="upload-area">
                    <div className="upload-formate mb--30">
                      <h6 className="title">Upload a file *</h6>
                      <p className="formate">Choose your file to upload</p>
                    </div>
                    <div className="brows-file-wrapper">
                      <input
                        name="file"
                        id="file"
                        type="file"
                        className="inputfile"
                        accept="image/*"
                        onChange={imageChange}
                      />
                      {selectedImage && (
                        <Image
                          id="createfileImage"
                          src={URL.createObjectURL(selectedImage)}
                          alt=""
                          data-black-overlay="6"
                          layout="fill"
                        />
                      )}

                      <label htmlFor="file" title="No File Choosen">
                        {!selectedImage && (
                          <>
                            <i className="feather-upload" />
                            <span className="text-center">Choose a File</span>
                            <p className="text-center mt--10">
                              PNG, JPG, GIF or JPEG <br /> Max 1Gb.
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                    {hasImageError && !selectedImage && <ErrorText>Image is required</ErrorText>}
                    {hasImageTypeError && (
                      <ErrorText>The extension you uploaded is not allowed</ErrorText>
                    )}
                  </div>
                  <label
                    className="d-flex align-items-center justify-content-center g-3 mt-5"
                    style={{ gap: '10px' }}
                  >
                    <span>Lazy Minting</span>
                    <Switch
                      onChange={handleLazyChecked}
                      checked={isLazy}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor="#35b049"
                    />
                  </label>
                </div>
                <div className="col-lg-7">
                  <div className="form-wrapper-one">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="input-box pb--20">
                          <label htmlFor="name" className="form-label">
                            NFT Name *
                          </label>
                          <input
                            id="name"
                            placeholder='e. g. "Happy Ape"'
                            {...register('name', {
                              required: 'Name is required',
                              maxLength: {
                                value: 35,
                                message:
                                  'Please type a description shorter than 35 characters (including spaces)',
                              },
                            })}
                          />
                          {errors.name && errors.name.message && (
                            <ErrorText>{errors.name.message}</ErrorText>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="input-box pb--20">
                          <label htmlFor="Description" className="form-label">
                            Description *
                          </label>
                          <textarea
                            id="description"
                            rows={3}
                            placeholder="e. g. “After purchasing the product you can get item...”"
                            {...register('description', {
                              required: 'Description is required',
                            })}
                          />
                          {errors.description && errors.description.message && (
                            <ErrorText>{errors.description.message}</ErrorText>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="input-box ">
                          <label className="form-label">Collection *</label>
                          <div
                            className={clsx(
                              'nice-select d-flex align-items-center select-collections',
                              open && 'open'
                            )}
                            role="button"
                            onClick={() => setOpen((prev) => !prev)}
                            tabIndex={0}
                            onKeyPress={(e) => e}
                            ref={collectionsDropdownRef}
                          >
                            <span className="current">
                              {dropdownCollection || 'Assign a Collection'}
                            </span>
                            <ul
                              className="list list-create-dropdown"
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
                                onClick={handleDefaultCollection}
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
                                    {getFormattedName(userCollection.name)}
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
                          </div>
                        </div>
                        {collectionSubmitError && (
                          <p
                            style={{ fontSize: '14px', marginBottom: '10px' }}
                            className="text-danger"
                          >
                            {collectionSubmitError}
                          </p>
                        )}
                      </div>

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
                            {collectionError && (
                              <span className="text-danger">{collectionError}</span>
                            )}
                            <div className="">
                              <label htmlFor="collection-image" style={{ color: '#A2A1B2' }}>
                                Upload an Image for the collection (PNG, JPG, GIF or JPEG. Max 1Gb.)
                              </label>
                              {collectionImageName === '' ? (
                                <input
                                  className="props-input mt-2"
                                  onChange={handleCollectionImageChange}
                                  accept="image/*"
                                  type="file"
                                  id="collection-image"
                                />
                              ) : (
                                <div className="props-input row mt-2">
                                  <h6 className="col-10">File choosed: {collectionImageName}</h6>
                                  <button
                                    className="col-2"
                                    type="button"
                                    style={{ border: 'none' }}
                                    onClick={() => setCollectionImageName('')}
                                  >
                                    <RiDeleteBack2Fill style={{ fontSize: '25px' }} />
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="mt-4">
                              <label htmlFor="collection-name">
                                Enter a name for the Collection
                              </label>
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
                              <label htmlFor="collection-name">
                                Enter a description for the collection
                              </label>
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

                      <div className="col-md-6">
                        <div className="input-box pb--20">
                          <label className="form-label">Tags *</label>
                          {tagErrMessage && (
                            <p
                              style={{ fontSize: '14px', marginBottom: '10px' }}
                              className="text-danger"
                            >
                              {tagErrMessage}
                            </p>
                          )}
                          <TagsInput
                            value={tags}
                            onValidationReject={() =>
                              setTagErrMessage(tagsErrorMessages.LenghtNotAllowed)
                            }
                            onChange={handleTagsChange}
                            addOnPaste
                            onlyUnique
                            addOnBlur
                            /* key codes: 9 = tab; 13 = enter; 32 = space bar; */
                            addKeys={[9, 13, 32]}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="input-box">
                          <label htmlFor="property" className="form-label">
                            Properties
                          </label>
                        </div>
                        <div className="d-flex justify-content-between align-items-center newPropertiesInput">
                          <span style={{ color: '#A2A1B2' }}>
                            {properties.length
                              ? `${properties.length} ${
                                  properties.length === 1 ? 'property' : 'properties'
                                } added`
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
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={handlePropsModal}
                        >
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
                              Properties show up underneath your item, are clickable, and can be
                              filtered in your collection&apos;s sidebar.
                            </p>
                            {propertiesModalMessage ? (
                              <span className="text-danger text-center mb-2">
                                {propertiesModalMessage} <br />
                              </span>
                            ) : (
                              <small>Press enter to add a property</small>
                            )}

                            {properties.map((property: ItemProperty) => (
                              <div
                                key={property.key}
                                className="row align-items-center form-wrapper-three mb-4"
                              >
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

                      <div className="col-md-6">
                        <div className="input-box pb--20">
                          <label htmlFor="Royalty" className="form-label">
                            Royalty in % *
                          </label>
                          <input
                            id="royalty"
                            min={0}
                            placeholder='e. g. "10"'
                            {...register('royalty', {
                              required: 'Royalty is required',
                              max: { value: 10, message: 'The maximum value is 10' },
                              min: { value: 0, message: 'The minimum value is 0' },
                            })}
                            type="number"
                          />
                          {errors.royalty && errors.royalty.message && (
                            <ErrorText>{errors.royalty.message}</ErrorText>
                          )}
                        </div>
                      </div>
                      {isLazy && (
                        <div className="col-md-12">
                          <div className="input-box pb--20">
                            <label htmlFor="price" className="form-label">
                              Price in ETH
                            </label>
                            <input
                              id="price"
                              placeholder="e. g. `0.001`"
                              {...register('price', {
                                pattern: {
                                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                  message: 'Please enter a valid number',
                                },
                                required: 'Price is required',
                              })}
                            />
                            {errors.price && errors.price.message && (
                              <ErrorText>{errors.price.message}</ErrorText>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="col-md-12 col-xl-4">
                        <div className="input-box">
                          <Button
                            color="primary-alta"
                            fullwidth
                            type="submit"
                            data-btn="preview"
                            onClick={handleSubmit(onSubmit)}
                          >
                            Preview
                          </Button>
                        </div>
                      </div>
                      <div className="col-md-12 col-xl-8 mt_lg--15 mt_md--15 mt_sm--15">
                        <div className="input-box">
                          <Button type="submit" fullwidth>
                            Submit Item
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt--100 mt_sm--30 mt_md--30 d-block d-lg-none">
                  <h5> Note: </h5>
                  <span>
                    {' '}
                    Service fee : <strong>2.5%</strong>{' '}
                  </span>{' '}
                  <br />
                  <span>
                    {' '}
                    You will receive : <strong>25.00 ETH $50,000</strong>
                  </span>
                </div>
              </div>
            </SpinnerContainer>
          </div>
        </form>
      </div>
      {showProductModal && (
        <ProductModal
          show={showProductModal}
          handleModal={handleProductModal}
          item={previewData}
          tags={tags}
        />
      )}
    </>
  );
};

export default CreateNewArea;
