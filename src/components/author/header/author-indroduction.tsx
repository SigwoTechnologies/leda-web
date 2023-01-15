import ShareModal from '@components/modals/share-modal';
import { changePictureCollection } from '@features/marketplace/store/collections.actions';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { openToastError, openToastInfo } from '@store/ui/ui.slice';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import ItemStatus from '../../../common/minting/enums/item-status.enum';
import ReportModal from '../../modals/report-modal/index';
import { BackgroundPicture } from './background-picture';
import { ProfilePicture } from './profile-picture';

export const AuthorIntroArea = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const { likedItems } = useAppSelector((state) => state.marketplace);
  const {
    account: { address },
  } = useAppSelector((state) => state.auth);

  const likedItemsToShow = useMemo(
    () =>
      likedItems.filter(
        (item) => item.status === ItemStatus.Listed || item.owner.address === address
      ),
    [likedItems, address]
  );

  const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);
  const handleReportModal = () => setShowReportModal((prev) => !prev);

  return (
    <>
      <ShareModal show={isShareModalOpen} handleModal={shareModalHandler} />
      <ReportModal show={showReportModal} handleModal={handleReportModal} />
      <BackgroundPicture />
      <div className="rn-author-area mb--30 mt_dec--120">
        <div className="container">
          <div className="row padding-tb-50 align-items-center d-flex">
            <div className="col-lg-12">
              <div className="author-wrapper">
                <div className="author-inner">
                  <ProfilePicture />

                  <div className="rn-author-info-content">
                    <h4 className="title-s mb-3">{address}</h4>
                    <div className="follow-area">
                      <div className="follow following">
                        <p className="color-body">
                          <span>{likedItemsToShow.length}</span> Interactions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
