import ActionLoaderComponent from '@components/action-loader/action-loader.component';
import clsx from 'clsx';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ItemStatus from '../../common/minting/enums/item-status.enum';
import { withAuthProtection } from '../../features/auth/store/auth.actions';
import { hideItem } from '../../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';

export const HideItemButton = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    selectedItem: { itemId, status },
    isLoading,
  } = useAppSelector((state) => state.marketplace);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSubmit = () => {
    dispatch(withAuthProtection(hideItem(itemId)));
    handleModal();
  };

  return (
    <>
      <div className="count">
        <button
          type="button"
          style={{ width: '5rem', fontSize: '20px' }}
          onClick={handleModal}
          title={`currently is ${status === ItemStatus.Hidden ? 'hidden' : 'visible'}`}
        >
          <i className={clsx(status === ItemStatus.Hidden ? 'feather-eye-off' : 'feather-eye')} />
        </button>
      </div>

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
          <h3 className="modal-title fw-light">
            Do you want to make {status === ItemStatus.Hidden ? 'visible' : 'hidden'} this item?
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="placebid-form-box">
            <div className="bit-continue-button">
              <ActionLoaderComponent
                isLoading={isLoading}
                onClick={onSubmit}
                buttonSize="medium"
                type="submit"
                buttonFullwidth
                label="Continue"
                labelLoading="Changing this visibility"
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
