import Modal from 'react-bootstrap/Modal';
import Button from '@ui/button';
import { Item } from '@types';

type Props = {
  show: boolean;
  handleModal: () => void;
  item?: Item;
};

const PlaceBidModal = ({ show, handleModal, item }: Props) => (
  <div>
    {item ? (
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
              <Button path="/connect" size="medium" fullwidth>
                Buy NFT for {item?.price} ETH
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    ) : null}
  </div>
);

export default PlaceBidModal;
