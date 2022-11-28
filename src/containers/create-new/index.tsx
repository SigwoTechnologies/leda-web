// TODO: This needs a refactor at all
import { ItemRequest } from '@types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '@ui/button';
import ErrorText from '@ui/error-text';
import Image from 'next/image';
import ProductModal from '@components/modals/product-modal';
import React, { useEffect, useState, useRef } from 'react';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import TagsInput from 'react-tagsinput';
import Modal from 'react-bootstrap/Modal';
import clsx from 'clsx';
import { AiOutlinePlus } from 'react-icons/ai';
import * as yup from 'yup';
import NftCollectionComponent from '@components/create-page/nft-collection.component';
import NftDescriptionComponent from '@components/create-page/nft-description.component';
import NftImageComponent from '@components/create-page/nft-image.component';
import NftNameComponent from '@components/create-page/nft-name.component';
import NftTagsComponent from '@components/create-page/nft-tags.component';
import NftPropertiesComponent from '@components/create-page/nft-properties.component';
import NftRoyaltyComponent from '@components/create-page/nft-royalty.component';
import TextInputComponent from '../../components/common/TextInput.component';
import { mintNft } from '../../features/leda-nft/store/leda-nft.actions';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { selectNftState } from '../../features/leda-nft/store/leda-nft.slice';
import useMetamask from '../../features/auth/hooks/useMetamask';
import { ItemProperty } from '../../common/types/ipfs-types';
import { ICollection } from '../../types/ICollection';
import { findUserCollectionsWithoutItems } from '../../features/account/store/account.actions';
import { selectUserCollectionsWithoutItems } from '../../features/account/store/account.slice';
import { CollectionCreateType } from '../../types/collection-type';
import CreateNftForm from './create-nft.form';
import { selectMarketplaceState } from '../../features/marketplace/store/marketplace.slice';

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
  LongString: 'The collection must contains less than 13 characters (including spaces)',
  ShortString: 'The collection must contains at least 4 characters (including spaces)',
  AlreadyExists: 'This Collection already exist. Try creating another one',
};

const schema = yup.object({
  nftImage: yup.object(),
  nftName: yup
    .string()
    .required('The NFT Name is required')
    .min(3, 'Please enter at least 3 characters')
    .max(15, 'You can not enter more than 15 characters'),
  nftDescription: yup
    .string()
    .required('The NFT Description is required')
    .min(6, 'Please enter at least 6 characters')
    .max(40, 'You can not enter more than 40 characters'),
  nftCollection: yup.array().max(1),
  nftTags: yup
    .array()
    .min(1, 'Please enter at least 1 tag')
    .max(8, 'You can not enter more than 8 tags'),
  nftProperties: yup.array().max(10, 'You can not enter more than 10 properties'),
  nftRoyalty: yup
    .number()
    .min(1, 'Please enter a royalty higher or equal to 1')
    .max(10, 'Please enter a royalty lower than 10'),
});

const CreateNewArea = () => {
  const dispatch = useAppDispatch();
  const { address } = useMetamask();
  const { isLoading } = useAppSelector(selectNftState);
  const { formCreateNft } = useAppSelector(selectMarketplaceState);

  // ! Collections
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
      } as ICollection;

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

  // ! Tags
  const [tags, setTags] = useState<string[]>([]);
  const [tagErrMessage, setTagErrMessage] = useState('' as string);

  const handleTagsChange = (tagProps: string[]) => {
    // prevent empty tags
    if (!tagProps.includes('')) setTags(tagProps);
  };

  useEffect(() => {
    if (tags.length <= 8) {
      setTagErrMessage('');
    }
  }, [tags]);

  // ! Properties
  const keyRef = useRef<HTMLInputElement>(null);
  const [properties, setProperties] = useState<ItemProperty[]>([]);
  const [propertiesModalMessage, setPropertiesModalMessage] = useState('');
  const [propsModalOpen, setPropsModalOpen] = useState(false);
  const [propsInput, setPropsInput] = useState(initialPropsInputState);

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

  // ! Others
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasImageError, setHasImageError] = useState(false);
  const [hasImageTypeError, setHasImageTypeError] = useState(false);
  const [previewData, setPreviewData] = useState({} as ItemRequest);
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

  // This function will be triggered when the file field change
  const FilesAllowed = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
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

  const onSubmit = async (data: ItemRequest, e: any) => {
    const { target } = e;
    const submitBtn = target.localName === 'span' ? target.parentElement : target;
    const isPreviewBtn = submitBtn.dataset?.btn;
    setHasImageError(!selectedImage);
    const longTags = tags.filter((tag) => tag.length >= 8);

    if (longTags.length) setTagErrMessage(tagsErrorMessages.LenghtNotAllowed);
    if (tags.length > 8) setTagErrMessage(tagsErrorMessages.CantMore);
    if (tags.length === 0) setTagErrMessage(tagsErrorMessages.AtLeast);
    if (isPreviewBtn && selectedImage) {
      setPreviewData({ ...data, blob: selectedImage });
      setShowProductModal(true);
    }

    if (!isPreviewBtn && selectedImage && tags.length && tags.length <= 8 && !longTags.length) {
      dispatch(
        mintNft({
          ...data,
          address,
          collection: formCreateNft.collection,
          blob: selectedImage,
          tags: formCreateNft.tags,
          itemProperties: formCreateNft.properties,
        } as ItemRequest)
      );
    }
  };

  return (
    <>
      <CreateNftForm onSubmit={(e) => console.log(e)} form={{ resolver: yupResolver(schema) }}>
        <div className="create-area rn-section-gapTop" style={{ height: '100vh' }}>
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                <NftImageComponent name="nftImage" />
              </div>
              <div className="col-lg-7">
                <div className="form-wrapper-one">
                  <div className="row">
                    <NftNameComponent name="nftName" placeholder="e. g. `Happy Ape`" />

                    <NftDescriptionComponent
                      name="nftDescription"
                      placeholder="e. g. “After purchasing the product you can get item...”"
                    />
                    <div className="col-md-6">
                      <NftCollectionComponent />
                    </div>
                    <div className="col-md-6">
                      <NftTagsComponent />
                    </div>
                    <NftPropertiesComponent />
                    <div className="col-md-6">
                      <NftRoyaltyComponent name="nftRoyalty" placeholder="e. g. `10`" />
                    </div>
                  </div>
                  <div className="row">
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
            </div>
          </div>
        </div>
      </CreateNftForm>

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
