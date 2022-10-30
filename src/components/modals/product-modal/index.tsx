import Modal from 'react-bootstrap/Modal';
import Product from '@components/item';
import { ItemRequest } from '@types';

type Props = {
  show: boolean;
  handleModal: () => void;
  item: ItemRequest;
  tags: string[];
};

const ProductModal = ({ show, handleModal, item, tags }: Props) => (
  <Modal className="rn-popup-modal upload-modal-wrapper" show={show} onHide={handleModal} centered>
    <button type="button" className="btn-close" aria-label="Close" onClick={handleModal}>
      <i className="feather-x" />
    </button>

    <Modal.Body>
      <Product
        overlay
        disableShareDropdown
        title={item.name}
        itemId="preview sample"
        tokenId={1}
        latestBid=""
        isCreator
        price={0.00001}
        tags={tags}
        likeCount={290}
        imageString={URL.createObjectURL(item.blob)}
      />
    </Modal.Body>
  </Modal>
);

export default ProductModal;
