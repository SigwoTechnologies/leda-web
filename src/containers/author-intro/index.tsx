import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import ShareModal from '@components/modals/share-modal';
import { Author } from '@types';
import { selectLikedItems } from '../../features/account/store/account.slice';
import useAppSelector from '../../store/hooks/useAppSelector';
import ReportModal from '../../components/modals/report-modal/index';

type Props = {
  className?: string;
  space?: number;
  data: Author;
  address: string;
};

const AuthorIntroArea = ({ className, space = 1, data, address }: Props) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);
  const handleReportModal = () => setShowReportModal((prev) => !prev);

  const likedItems = useAppSelector(selectLikedItems);

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
      <div className={clsx('rn-author-area', space === 1 && 'mb--30 mt_dec--120', className)}>
        <div className="container">
          <div className="row padding-tb-50 align-items-center d-flex">
            <div className="col-lg-12">
              <div className="author-wrapper">
                <div className="author-inner">
                  {data?.image?.src && (
                    <div className="user-thumbnail">
                      <Image
                        src="https://source.unsplash.com/random/140x140"
                        alt={data.image?.alt || data.name}
                        width={140}
                        height={140}
                        layout="fixed"
                      />
                    </div>
                  )}

                  <div className="rn-author-info-content">
                    <h4 className="title">{address}</h4>
                    <div className="follow-area">
                      <div className="follow following">
                        <p className="color-body">
                          <span>{likedItems.length}</span> Interactions
                        </p>
                      </div>
                    </div>
                    <div className="author-button-area">
                      <button
                        type="button"
                        className="btn at-follw share-button"
                        onClick={shareModalHandler}
                      >
                        <i className="feather-share-2" />
                      </button>
                      <button
                        type="button"
                        className="btn at-follw share-button"
                        onClick={handleReportModal}
                      >
                        <i className="feather-alert-octagon" />
                      </button>
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

export default AuthorIntroArea;
