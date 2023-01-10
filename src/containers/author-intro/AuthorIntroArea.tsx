import ShareModal from '@components/modals/share-modal';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import ItemStatus from '../../common/minting/enums/item-status.enum';
import ReportModal from '../../components/modals/report-modal/index';
import { AuthorData } from '../../data/AuthorData';
import useAppSelector from '../../store/hooks/useAppSelector';

type Props = {
  address: string;
};

export const AuthorIntroArea = ({ address }: Props) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const { imageNumber } = useAppSelector((state) => state.account);
  const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);
  const handleReportModal = () => setShowReportModal((prev) => !prev);

  const { likedItems } = useAppSelector((state) => state.marketplace);

  const likedItemsToShow = useMemo(
    () =>
      likedItems.filter(
        (item) => item.status === ItemStatus.Listed || item.owner.address === address
      ),
    [likedItems, address]
  );

  return (
    <>
      <ShareModal show={isShareModalOpen} handleModal={shareModalHandler} />
      <ReportModal show={showReportModal} handleModal={handleReportModal} />
      <div className="rn-author-bg-area position-relative ptb--150">
        <Image
          src="https://source.unsplash.com/random/1920x300"
          alt="Slider BG"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      <div className="rn-author-area mb--30 mt_dec--120">
        <div className="container">
          <div className="row padding-tb-50 align-items-center d-flex">
            <div className="col-lg-12">
              <div className="author-wrapper">
                <div className="author-inner">
                  {AuthorData?.image?.src && (
                    <div className="user-thumbnail">
                      <Image
                        src={`/images/avatars/${imageNumber}.png`}
                        alt={AuthorData.name}
                        width={140}
                        height={140}
                        layout="fixed"
                      />
                    </div>
                  )}

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
