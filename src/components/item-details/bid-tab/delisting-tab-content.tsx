import Button from '@ui/button';
import Modal from 'react-bootstrap/Modal';
import { withAuthProtection } from '../../../features/auth/store/auth.actions';
import { delistItem } from '../../../features/marketplace/store/marketplace.actions';
import { setIsModalOpen } from '../../../features/marketplace/store/marketplace.slice';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';
import ActionLoaderComponent from '../../action-loader/action-loader.component';

export const DelistingTabContent = () => {
  const { isLoading, selectedItem, isModalOpen } = useAppSelector((state) => state.marketplace);
  const dispatch = useAppDispatch();

  const handleModal = () => {
    dispatch(setIsModalOpen(!isModalOpen));
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
  };

  return (
    <>
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
              <ActionLoaderComponent
                isLoading={isLoading}
                buttonSize="medium"
                buttonFullwidth
                onClick={onSubmit}
                label="Delist my NFT"
                labelLoading="Delisting"
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
