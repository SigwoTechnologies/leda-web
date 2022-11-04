import { Item } from '@types';
import Button from '@ui/button';
import Modal from 'react-bootstrap/Modal';
import ClipLoader from 'react-spinners/ClipLoader';
import useMetamask from '../../../features/auth/hooks/useMetamask';
import { selectNftState } from '../../../features/leda-nft/store/leda-nft.slice';
import { buyItem } from '../../../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';

type Props = {
  show: boolean;
  handleModal: () => void;
  item?: Item;
};

const Spinner = () => <ClipLoader className="spinner" color="#fff" size={18} />;

const PlaceBidModal = ({ show, handleModal, item }: Props) => {
  const { isLoading } = useAppSelector(selectNftState);
  const dispatch = useAppDispatch();
  const { address } = useMetamask();
  const onSubmit = async () => {
    if (item) {
      const { type } = await dispatch(
        buyItem({
          address,
          price: String(item.price),
          tokenId: item.tokenId,
          itemId: item.itemId,
          listId: item.listId,
        })
      );

      if (type.includes('fulfilled')) {
        handleModal();
      }
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
