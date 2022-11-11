import Button from '@ui/button';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import useMetamask from '../../../features/auth/hooks/useMetamask';
import { withAuthProtection } from '../../../features/auth/store/auth.actions';
import { delistItem } from '../../../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';

export const DelistingTabContent = () => {
  useMetamask();
  const { isLoading, selectedItem, isCompleted } = useAppSelector((state) => state.marketplace);
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const handleModal = () => {
    setShow((prev) => !prev);
  };

  const onSubmit = async () => {
    dispatch(
      withAuthProtection(
        delistItem({
          listId: selectedItem.listId,
          itemId: selectedItem.itemId,
          ownerAddress: selectedItem.owner.address,
        })
      )
    );
    if (isCompleted) {
      handleModal();
    }
  };

  return (
    <>
      <SpinnerContainer isLoading={isLoading}>
        <div className="row g-5 mt-1">
          <div className="col-lg-12">
            <div className="form-wrapper-one">
              <div className="row">
                <div className="col-md-12 col-xl-12 mt_lg--15 mt_md--15 mt_sm--15">
                  <div className="input-box">
                    <Button type="submit" fullwidth onClick={handleModal}>
                      Delist from Marketplace
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SpinnerContainer>

      <Modal
        className="rn-popup-modal placebid-modal-wrapper"
        show={show}
        onHide={handleModal}
        centered
      >
        <button type="button" className="btn-close" aria-label="Close" onClick={handleModal}>
          <i className="feather-x" />
        </button>
        <Modal.Header>
          <h3 className="modal-title fw-light">
            Delist{' '}
            <span className="fw-bold">
              {selectedItem?.name} #{selectedItem?.tokenId}
            </span>{' '}
            NFT
          </h3>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">You are about to delist your NFT from Marketplace</p>
          <div className="placebid-form-box">
            <div className="bit-continue-button">
              <Button
                size="medium"
                fullwidth
                onClick={onSubmit}
                className={isLoading ? 'disabled' : ''}
              >
                <div className="d-flex align-items-center justify-content-center gap-2">
                  Delist my NFT
                </div>
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
