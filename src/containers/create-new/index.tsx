import { ItemRequest } from '@types';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Button from '@ui/button';
import clsx from 'clsx';
import ErrorText from '@ui/error-text';
import Image from 'next/image';
import ProductModal from '@components/modals/product-modal';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SpinnerContainer from '@ui/spinner-container';
import { mintNft } from '../../features/leda-nft/store/leda-nft.actions';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { selectState } from '../../features/leda-nft/store/leda-nft.slice';
import useMetamask from '../../features/auth/hooks/useMetamask';

type Props = {
  className?: string;
  space: number;
};

const CreateNewArea = ({ className, space }: Props) => {
  const dispatch = useAppDispatch();
  const { address } = useMetamask();
  const { isLoading } = useAppSelector(selectState);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasImageError, setHasImageError] = useState(false);
  const [previewData, setPreviewData] = useState({} as ItemRequest);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ItemRequest>({
    mode: 'onChange',
  });

  const notify = () => toast('Your product has submitted');
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
    setSelectedImage(null);
  };

  const onSubmit = (data: ItemRequest, e: any) => {
    const { target } = e;
    const submitBtn = target.localName === 'span' ? target.parentElement : target;
    const isPreviewBtn = submitBtn.dataset?.btn;
    setHasImageError(!selectedImage);
    if (isPreviewBtn && selectedImage) {
      setPreviewData({ ...data, blob: selectedImage });
      setShowProductModal(true);
    }
    if (!isPreviewBtn && selectedImage) {
      dispatch(mintNft({ ...data, address, blob: selectedImage } as ItemRequest));
      notify();
      resetForm();
    }
  };

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
                      <h6 className="title">Upload file</h6>
                      <p className="formate">Drag or choose your file to upload</p>
                    </div>

                    <div className="brows-file-wrapper">
                      <input
                        name="file"
                        id="file"
                        type="file"
                        className="inputfile"
                        data-multiple-caption="{count} files selected"
                        multiple
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

                      <div className="col-md-4">
                        <div className="input-box pb--20">
                          <label htmlFor="price" className="form-label">
                            Item Price in $
                          </label>
                          <input
                            id="price"
                            placeholder="e. g. `20`"
                            {...register('price', {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: 'Please enter a number',
                              },
                              required: 'Price is required',
                            })}
                          />
                          {errors.price && errors.price.message && (
                            <ErrorText>{errors.price.message}</ErrorText>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-box pb--20">
                          <label htmlFor="property" className="form-label">
                            Properties
                          </label>
                          <input
                            id="property"
                            placeholder="e. g. `Glasses`"
                            {...register('property', {
                              required: 'Propertiy is required',
                            })}
                          />
                          {errors.property && errors.property?.message && (
                            <ErrorText>{errors.property.message}</ErrorText>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-box pb--20">
                          <label htmlFor="Royalty" className="form-label">
                            Royalty in %
                          </label>
                          <input
                            id="royalty"
                            placeholder="e. g. `10`"
                            {...register('royalty', {
                              required: 'Royalty is required',
                            })}
                          />
                          {errors.royalty && errors.royalty.message && (
                            <ErrorText>{errors.royalty.message}</ErrorText>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12">
                        <div className="input-box pb--20 rn-check-box">
                          <input className="rn-check-box-input" type="checkbox" id="putonsale" />
                          <label className="rn-check-box-label" htmlFor="putonsale">
                            Put on Sale
                          </label>
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
        <ProductModal show={showProductModal} handleModal={handleProductModal} data={previewData} />
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
