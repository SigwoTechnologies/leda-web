import { ItemRequest } from '@types';
import { useForm } from 'react-hook-form';
import Button from '@ui/button';
import clsx from 'clsx';
import ErrorText from '@ui/error-text';
import Image from 'next/image';
import ProductModal from '@components/modals/product-modal';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import TagsInput from 'react-tagsinput';
import Modal from 'react-bootstrap/Modal';
import { mintNft } from '../../features/leda-nft/store/leda-nft.actions';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { selectNftState } from '../../features/leda-nft/store/leda-nft.slice';
import useMetamask from '../../features/auth/hooks/useMetamask';
import { PropertiesTypes } from '../../common/types/ipfs-types';

type Props = {
  className?: string;
  space: number;
};

const tagsErrorMessage = {
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
  ProvideData: 'Please enter type and name',
  MaxLength: 'You can not enter more than 4 properties',
};

const CreateNewArea = ({ className, space }: Props) => {
  const [properties, setProperties] = useState<PropertiesTypes[]>([]);
  const [propertiesModalMessage, setPropertiesModalMessage] = useState('');
  const [propsModalOpen, setPropsModalOpen] = useState(false);
  const [propsInput, setPropsInput] = useState(initialPropsInputState);

  const dispatch = useAppDispatch();
  const { address } = useMetamask();
  const { isLoading } = useAppSelector(selectNftState);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null as null);
  const [hasImageError, setHasImageError] = useState(false);
  const [previewData, setPreviewData] = useState({} as ItemRequest);
  const [tags, setTags] = useState<string[]>([]);
  const [tagErrMessage, setTagErrMessage] = useState('' as string);

  const handlePropsModal = () => setPropsModalOpen((prev) => !prev);

  const handleAddMoreProps = (key: string, value: string) => {
    const itemsWithSameKey = properties.filter((prop: PropertiesTypes) => prop.key === key);

    if (itemsWithSameKey.length > 0) {
      setPropertiesModalMessage(propertiesModalMessages.NotRepeteadAllowed);
    } else if (key === '' || value === '') {
      setPropertiesModalMessage(propertiesModalMessages.ProvideData);
    } else if (properties.length > 4) {
      setPropertiesModalMessage(propertiesModalMessages.MaxLength);
    } else {
      setPropertiesModalMessage('');
      setPropsInput(initialPropsInputState);
      setProperties([...properties, { key, value }]);
    }
  };

  const handleDeleteProp = (key: string) => {
    const found = properties.filter((prop: PropertiesTypes) => prop.key !== key);
    setProperties(found);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ItemRequest>({
    mode: 'onChange',
  });

  const handleProductModal = () => {
    setShowProductModal(false);
  };

  // This function will be triggered when the file field change
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const resetForm = () => {
    reset();
    setTags([]);
    setSelectedImage(null);
  };

  const onSubmit = (data: ItemRequest, e: any) => {
    const { target } = e;
    const submitBtn = target.localName === 'span' ? target.parentElement : target;
    const isPreviewBtn = submitBtn.dataset?.btn;
    setHasImageError(!selectedImage);
    if (tags.length > 8) setTagErrMessage(tagsErrorMessage.CantMore);
    if (tags.length === 0) setTagErrMessage(tagsErrorMessage.AtLeast);
    if (isPreviewBtn && selectedImage) {
      setPreviewData({ ...data, blob: selectedImage });
      setShowProductModal(true);
    }
    if (!isPreviewBtn && selectedImage && tags.length > 0 && tags.length <= 8) {
      dispatch(mintNft({ ...data, address, blob: selectedImage, tags } as ItemRequest));
      resetForm();
    }
  };

  const handleTagsChange = (tagProps: string[]) => {
    // prevent empty tags
    if (!tagProps.includes('')) setTags(tagProps);
  };

  useEffect(() => {
    if (tags.length <= 8) {
      setTagErrMessage('');
    }
  }, [tags]);

  return (
    <>
      <div className={clsx('create-area', space === 1 && 'rn-section-gapTop', className)}>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <SpinnerContainer isLoading={isLoading}>
              <div className="row g-5">
                <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                  <div className="upload-area">
                    <div className="upload-formate mb--30">
                      <h6 className="title">Upload a file</h6>
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
                        <i className="feather-upload" />
                        <span className="text-center">Choose a File</span>
                        <p className="text-center mt--10">
                          PNG, GIF, WEBP, MP4 or MP3. <br /> Max 1Gb.
                        </p>
                      </label>
                    </div>
                    {hasImageError && !selectedImage && <ErrorText>Image is required</ErrorText>}
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-wrapper-one">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="input-box pb--20">
                          <label htmlFor="name" className="form-label">
                            Item name
                          </label>
                          <input
                            id="name"
                            placeholder="e. g. `Happy Ape`"
                            {...register('name', {
                              required: 'Name is required',
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
                            Description
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

                      <div className="col-md-12">
                        <div className="input-box pb--20">
                          <label className="form-label">Tags</label>
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
                              setTagErrMessage(tagsErrorMessage.LenghtNotAllowed)
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
                        <div
                          className="d-flex justify-content-between align-items-center"
                          style={{
                            background: '#242435',
                            height: '50px',
                            borderRadius: '5px',
                            color: '#fff',
                            fontSize: '14px',
                            padding: '10px 20px',
                            border: '2px solid #ffffff14',
                            transition: '0.3s',
                          }}
                        >
                          <span style={{ color: '#A2A1B2' }}>Add new Properties</span>
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
                            {propertiesModalMessage && (
                              <span className="text-danger text-center mb-2">
                                {propertiesModalMessage} <br />
                              </span>
                            )}
                            <div className="placebid-form-box">
                              <div className="bit-continue-button" />
                            </div>
                            {properties.map((property: PropertiesTypes) => (
                              <div
                                key={property.key}
                                className="row align-items-center form-wrapper-two mb-4"
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
                                    <input type="text" disabled placeholder={property.key} />
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="input-box">
                                    <input type="text" disabled placeholder={property.value} />
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
                              <div className="col-md-5">
                                <input
                                  onChange={(event) => {
                                    setPropsInput((prevalue) => ({
                                      ...prevalue,
                                      key: event.target.value,
                                    }));
                                  }}
                                  placeholder="Character"
                                  value={propsInput.key}
                                  type="text"
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
                                  placeholder="Male"
                                  value={propsInput.value}
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              className="w-auto btn btn-medium btn-link mt-5"
                              onClick={() => handleAddMoreProps(propsInput.key, propsInput.value)}
                            >
                              Add more
                            </button>

                            <button
                              type="button"
                              className="w-auto btn btn-large btn-primary mt-5 d-block mx-auto"
                              onClick={handlePropsModal}
                            >
                              Save Properties
                            </button>
                          </Modal.Body>
                        </SpinnerContainer>
                      </Modal>

                      <div className="col-md-6">
                        <div className="input-box pb--20">
                          <label htmlFor="Royalty" className="form-label">
                            Royalty in %
                          </label>
                          <input
                            id="royalty"
                            placeholder="e. g. `10`"
                            {...register('royalty', {
                              required: 'Royalty is required',
                              max: { value: 10, message: 'The maximum value is 10' },
                            })}
                            type="number"
                          />
                          {errors.royalty && errors.royalty.message && (
                            <ErrorText>{errors.royalty.message}</ErrorText>
                          )}
                        </div>
                      </div>
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

CreateNewArea.propTypes = {
  className: PropTypes.string,
  space: PropTypes.oneOf([1]),
};

CreateNewArea.defaultProps = {
  space: 1,
};

export default CreateNewArea;
