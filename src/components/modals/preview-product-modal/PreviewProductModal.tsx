import { ItemRequest } from '@types';
import { getFormattedName } from '@utils/getFormattedName';
import clsx from 'clsx';
import Modal from 'react-bootstrap/Modal';
import { setIsOpenPreviewProductModal } from '../../../features/marketplace/store/marketplace.slice';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';

type Props = {
  item: ItemRequest;
  tags: string[];
};

export const PreviewProductModal = ({ item, tags }: Props) => {
  const dispatch = useAppDispatch();
  const { isOpenPreviewProductModal } = useAppSelector((state) => state.marketplace);

  const onHideModal = () => dispatch(setIsOpenPreviewProductModal(false));

  if (isOpenPreviewProductModal)
    return (
      <Modal
        className="rn-popup-modal upload-modal-wrapper"
        show={isOpenPreviewProductModal}
        onHide={onHideModal}
        centered
      >
        <button type="button" className="btn-close" aria-label="Close" onClick={onHideModal}>
          <i className="feather-x" />
        </button>

        <Modal.Body>
          <div className={clsx('product-style-one')}>
            {item.isLazy && (
              <div className="ribbon ribbon-top-right">
                <span>Lazy</span>
              </div>
            )}
            <div className="card-thumbnail">
              <img
                src={URL.createObjectURL(item.blob)}
                alt="Leda MarketPlace."
                className="image-creator"
              />
            </div>
            <div className="mt-4">
              <div className="profile-share" />
              <div className="d-flex mt-5 align-items-center justify-content-between">
                <div>You own this NFT</div>
              </div>
            </div>

            <h5 className="product-name">{getFormattedName(item.name)}</h5>

            <div className="d-flex gap-2 flex-wrap">
              {tags &&
                tags.map((tag) => (
                  <p key={tag} style={{ marginBottom: '0' }}>
                    <span className="badge rounded-pill bg-success">{tag}</span>
                  </p>
                ))}
            </div>
            <div className="bid-react-area">
              {item.isLazy && (
                <div className="last-bid d-flex gap-2">
                  <span>{item.price}</span>
                  <span>ETH</span>
                </div>
              )}

              <div className="last-bid d-flex gap-2">
                <span>Not Listed Yet</span>
              </div>
              <div className="react-area">
                <svg
                  viewBox="0 0 17 16"
                  fill="none"
                  width="16"
                  height="16"
                  className="sc-bdnxRM sc-hKFxyN kBvkOu"
                >
                  <path
                    d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span className="number">0</span>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );

  return null;
};
