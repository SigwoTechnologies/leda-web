import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';
import useAppSelector from '../../../store/hooks/useAppSelector';
import { selectAllItems, selectById } from '../../../features/leda-nft/store/leda-nft.slice';
import { Item } from '../../../types/item';

type Props = {
  show: boolean;
  handleModal: () => void;
  itemId?: string;
};

const ShareModal = ({ show, handleModal, itemId }: Props) => {
  const { query } = useRouter();
  const itemQuery = useAppSelector((state) => selectById(state, `${query.itemId}`));
  const itemByProps = useAppSelector((state) => selectById(state, `${itemId}`));
  let item;
  if (query.itemId) {
    item = itemQuery;
  }
  if (itemId) {
    item = itemByProps;
  }

  return (
    <Modal className="rn-popup-modal share-modal-wrapper" show={show} onHide={handleModal} centered>
      {show && (
        <button type="button" className="btn-close" aria-label="Close" onClick={handleModal}>
          <i className="feather-x" />
        </button>
      )}

      <Modal.Header className="share-area">
        <h5 className="modal-title">{item ? `Share ${item.name}'s NFT` : 'Share this NFT'}</h5>
      </Modal.Header>
      <Modal.Body>
        <ul className="social-share-default">
          <li>
            <a
              href={
                itemId
                  ? `https://www.facebook.com/share.php?u=${window.location.origin}/item/${itemId}`
                  : `https://www.facebook.com/share.php?u=${window.location.href}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon">
                <i className="feather-facebook" />
              </span>
              <span className="text">facebook</span>
            </a>
          </li>
          <li>
            <a
              href={
                itemId
                  ? `https://twitter.com/intent/tweet?url=${window.location.origin}/item/${itemId}`
                  : `https://twitter.com/intent/tweet?url=${window.location.href}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon">
                <i className="feather-twitter" />
              </span>
              <span className="text">twitter</span>
            </a>
          </li>
          <li>
            <a
              href={
                itemId
                  ? `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.origin}/item/${itemId}`
                  : `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon">
                <i className="feather-linkedin" />
              </span>
              <span className="text">linkedin</span>
            </a>
          </li>
          <li>
            <a
              href={`https://wa.me/?text=Hey! ${
                item
                  ? `Did you check the ${item.name}'s NFT?. Check it out!:`
                  : 'Check Out *Leda MarketPlace:* '
              } *${itemId ? `${window.location.origin}/item/${itemId}` : window.location.href}*`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon">
                <i className="feather-phone" />
              </span>
              <span className="text">Whatsapp</span>
            </a>
          </li>
        </ul>
      </Modal.Body>
    </Modal>
  );
};

ShareModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
};
export default ShareModal;
