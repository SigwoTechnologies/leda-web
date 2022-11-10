import { Item } from '@types';
import Button from '@ui/button';
import Modal from 'react-bootstrap/Modal';
import ClipLoader from 'react-spinners/ClipLoader';
import useMetamask from '../../../features/auth/hooks/useMetamask';
import { withAuthProtection } from '../../../features/auth/store/auth.actions';
import {
  buyItem,
  findHistoryByItemId,
} from '../../../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';

type Props = {
  show: boolean;
  handleModal: () => void;
  item?: Item;
};

const Spinner = () => <ClipLoader className="spinner" color="#fff" size={18} />;

const PlaceBidModal = ({ show, handleModal, item }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.ledaNft);
  const { address } = useMetamask();

  const onSubmit = () => {
    if (item) {
      dispatch(
        withAuthProtection(
          buyItem({
            address,
            price: String(item.price),
            tokenId: item.tokenId,
            itemId: item.itemId,
            listId: item.listId,
          })
        )
      );
      dispatch(findHistoryByItemId({ itemId: item.itemId }));
    }
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
                {item?.name} #{item?.tokenId}
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
                <Button
                  size="medium"
                  fullwidth
                  onClick={onSubmit}
                  className={isLoading ? 'disabled' : ''}
                >
                  {isLoading ? (
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <Spinner />
                      <span>Buying...</span>
                    </div>
                  ) : (
                    `Buy NFT for ${item?.price} ETH`
                  )}
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
