import Modal from 'react-bootstrap/Modal';
import Button from '@ui/button';
import { Item } from '@types';

type Props = {
  show: boolean;
  handleModal: () => void;
  item?: Item;
};

const PlaceBidModal = ({ show, handleModal, item }: Props) => (
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
        You are about to purchase an NFT to <span className="fw-bold">{item?.author.address}</span>
      </p>
      <div className="placebid-form-box">
        {/* <div className="bid-content">
          <div className="bid-content-top">
            <div className="bid-content-left">
              <input id="value" type="text" name="value" />
              <span>wETH</span>
            </div>
          </div>

          <div className="bid-content-mid">
            <div className="bid-content-left">
              <span>Your Balance</span>
              <span>Service fee</span>
              <span>Total bid amount</span>
            </div>
            <div className="bid-content-right">
              <span>9578 wETH</span>
              <span>10 wETH</span>
              <span>9588 wETH</span>
            </div>
          </div>
        </div> */}
        <div className="bit-continue-button">
          <Button path="/connect" size="medium" fullwidth>
            Buy NFT for {item?.price} ETH
          </Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
);

export default PlaceBidModal;
