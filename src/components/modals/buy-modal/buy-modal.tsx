import ActionLoaderComponent from '@components/action-loader/action-loader.component';
import Modal from 'react-bootstrap/Modal';
import useMetamask from '../../../features/auth/hooks/useMetamask';
import { withAuthProtection } from '../../../features/auth/store/auth.actions';
import { redeemVoucher } from '../../../features/leda-nft/store/leda-nft.actions';
import { buyItem } from '../../../features/marketplace/store/marketplace.actions';
import { selectIsLoadingWhileBuy } from '../../../features/marketplace/store/marketplace.slice';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';

type Props = {
  handleModal: () => void;
};

export const BuyModal = ({ handleModal }: Props) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoadingWhileBuy);
  const { selectedItem, isModalOpen } = useAppSelector((state) => state.marketplace);
  const { address } = useMetamask();

  const onSubmit = async () => {
    if (selectedItem.isLazy) {
      dispatch(
        withAuthProtection(
          redeemVoucher({
            address,
            item: selectedItem,
          })
        )
      );
    } else {
      dispatch(
        withAuthProtection(
          buyItem({
            address,
            item: selectedItem,
          })
        )
      );
    }
  };

  return (
    <div>
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
            Buy <span className="fw-bold">{selectedItem?.name}</span> NFT
          </h3>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            You are about to purchase an NFT to{' '}
            <span className="fw-bold">{selectedItem.owner?.address}</span>{' '}
          </p>
          <div className="placebid-form-box">
            <div className="bit-continue-button">
              <ActionLoaderComponent
                isLoading={isLoading}
                onClick={onSubmit}
                buttonSize="medium"
                type="submit"
                buttonFullwidth
                label={`Buy NFT for ${selectedItem?.price} ETH`}
                labelLoading="Buying"
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
