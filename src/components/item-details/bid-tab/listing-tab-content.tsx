import Button from '@ui/button';
import ErrorText from '@ui/error-text';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import { TransactionType } from '../../../common/enums/transaction-types.enum';
import useMetamask from '../../../features/auth/hooks/useMetamask';
import { withAuthProtection } from '../../../features/auth/store/auth.actions';
import { changePriceItem, listItem } from '../../../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';
import { decimalCount } from '../../../utils/getDecimalsCount';
import { setIsModalOpen } from '../../../features/marketplace/store/marketplace.slice';
import ActionLoaderComponent from '../../action-loader/action-loader.component';

type TForm = {
  price: string;
};

export const ListingTabContent = () => {
  const { address } = useMetamask();
  const [isValid, setIsValid] = useState(false);
  const [price, setPrice] = useState('');
  const { isLoading, selectedItem, isModalOpen } = useAppSelector((state) => state.marketplace);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    mode: 'onChange',
  });

  const handleModal = () => {
    dispatch(setIsModalOpen(!isModalOpen));
  };

  const onSubmit = async (form: TForm) => {
    setPrice(form.price);
    handleModal();
  };

  const onConfirm = () => {
    if (selectedItem.history.at(0)?.transactionType === TransactionType.Delisted) {
      dispatch(
        withAuthProtection(
          changePriceItem({
            price,
            itemId: selectedItem.itemId,
            listId: selectedItem.listId,
            ownerAddress: selectedItem.owner.address,
            address,
            isLazy: selectedItem.isLazy,
            royalty: selectedItem.royalty,
            image: selectedItem.image,
          })
        )
      );
    } else {
      dispatch(
        withAuthProtection(
          listItem({
            address,
            price,
            tokenId: selectedItem.tokenId,
            itemId: selectedItem.itemId,
            ownerAddress: selectedItem.owner.address,
            listId: selectedItem.listId,
            isLazy: selectedItem.isLazy,
            royalty: selectedItem.royalty,
            image: selectedItem.image,
          })
        )
      );
    }
  };

  const handleInputChange = (number: string) => {
    const decimalsNumber = decimalCount(number);
    if (decimalsNumber > 18) setIsValid(false);
    if (decimalsNumber <= 18) setIsValid(true);
    if (number === '') setIsValid(false);
  };

  return (
    <>
      <div />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-5 mt-1">
          <div className="col-lg-12">
            <div className="form-wrapper-one">
              <div className="row">
                <div className="col-md-12">
                  <div className="input-box pb--20">
                    <label htmlFor="name" className="form-label">
                      Price (ETH)
                    </label>
                    <input
                      id="name"
                      placeholder="e. g. 0.001"
                      {...register('price', {
                        required: 'Price is required',
                        min: 0,
                      })}
                      step={0.0000001}
                      type="number"
                      onChange={(e) => handleInputChange(e.target.value)}
                      min={0}
                    />
                    <ErrorText>{errors.price?.message}</ErrorText>
                  </div>
                </div>

                <div className="col-md-12 col-xl-12 mt_lg--15 mt_md--15 mt_sm--15">
                  <div className="input-box">
                    <ActionLoaderComponent
                      isLoading={isLoading}
                      onClick={handleSubmit(onSubmit)}
                      buttonSize="medium"
                      disabled={!isValid}
                      type="submit"
                      buttonFullwidth
                      label="List"
                      labelLoading="Listing"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Modal
        className="rn-popup-modal placebid-modal-wrapper"
        show={isModalOpen}
        onHide={handleModal}
        centered
      >
        <button type="button" className="btn-close" aria-label="Close" onClick={handleModal}>
          <i className="feather-x" />
        </button>
        <Modal.Header>
          <h3 className="modal-title fw-light text-center">
            List{' '}
            <span className="fw-bold">
              {selectedItem?.name} #{selectedItem?.tokenId}
            </span>{' '}
            for <span className="fw-bold">{price} ETH</span>
          </h3>
        </Modal.Header>

        <Modal.Body>
          <p className="text-center">Once you list this NFT, it will be shown on the marketplace</p>
          <div className="placebid-form-box">
            <div className="bit-continue-button">
              <ActionLoaderComponent
                isLoading={isLoading}
                onClick={onConfirm}
                buttonSize="medium"
                buttonFullwidth
                label="List"
                labelLoading="Listing"
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
