import { Item } from '@types';
import Button from '@ui/button';
import Modal from 'react-bootstrap/Modal';
import useMetamask from '../../../features/auth/hooks/useMetamask';
import { buyItem } from '../../../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../../../store/hooks/useAppDispatch';

type Props = {
  show: boolean;
  handleModal: () => void;
  item?: Item;
};

const PlaceBidModal = ({ show, handleModal, item }: Props) => {
  const dispatch = useAppDispatch();
  const { address } = useMetamask();
  const onSubmit = () => {
    if (item)
      dispatch(
        buyItem({ address, price: String(item.price), tokenId: item.tokenId, itemId: item.itemId })
      );
  };

  return (
    <div>
      {item && (
        <Modal
          className="rn-popup-modal placebid-modal-wrapper"
          show={show}
          onHide={handleModal}
          centered
        >
          {show && (
            <button type="button" className="btn-close" aria-label="Close" onClick={handleModal}>
              <i className="feather-x" />
            </button>
          )}
          <Modal.Header>
            <h3 className="modal-title fw-light">
              Buy{' '}
              <span className="fw-bold">
                {item?.name}#{item?.tokenId}
              </span>{' '}
              NFT
            </h3>
          </Modal.Header>
          <Modal.Body>
            <p className="text-center">
              You are about to purchase an NFT to{' '}
              <span className="fw-bold">{item.owner?.address}</span>{' '}
            </p>
            <div className="placebid-form-box">
              <div className="bit-continue-button">
                <Button size="medium" fullwidth onClick={onSubmit}>
                  Buy NFT for {item?.price} ETH
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default PlaceBidModal;
