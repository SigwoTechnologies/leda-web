import { changePictureCollection } from '@features/marketplace/store/marketplace.actions';
import useAppDispatch from '@store/hooks/useAppDispatch';
import { openToastError, openToastInfo } from '@store/ui/ui.slice';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import Image from 'next/image';
import { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Files from 'react-files';
import { MdAddAPhoto } from 'react-icons/md';
import appConfig from '../../../common/configuration/app.config';
import useAppSelector from '../../../store/hooks/useAppSelector';
import { formattedAddress } from '../../../utils/getFormattedAddress';

const CollectionIntroductionComponent = () => {
  const dispatch = useAppDispatch();
  const { selectedCollection, isUploadingImage } = useAppSelector((state) => state.marketplace);
  const [uploadPhoto, setUploadPhoto] = useState(true);

  const lastUpdateDate = new Date(selectedCollection.updatedAt).toLocaleDateString();

  const handleSelectFile = async ([file]: [File]) => {
    if (!file) return;
    dispatch(openToastInfo('Uploading image, please wait'));
    dispatch(changePictureCollection({ file, selectedCollection }));
  };

  const onFilesError = (error: Error) => {
    dispatch(
      openToastError(
        `${error.message}${error.message.includes(' is too large') ? ', maximum size 100.6MB' : ''}`
      )
    );
  };

  return (
    <div>
      <div className="rn-author-bg-area position-relative ptb--100" />
      <div className="rn-author-area mb--30 mt_dec--120">
        <div className="container">
          <div className="row padding-tb-50 align-items-center d-flex">
            <div className="col-lg-12">
              <div className="author-wrapper" style={{ justifyContent: 'start' }}>
                <div className="author-inner">
                  <div className="user-thumbnail" style={{ margin: 'initial' }}>
                    <SpinnerContainer isLoading={isUploadingImage}>
                      <Files
                        onChange={handleSelectFile}
                        accepts={['image/*']}
                        multiple
                        maxFileSize={160000000}
                        minFileSize={0}
                        onError={onFilesError}
                        clickable
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          transition: 'all 5s ease-out',
                        }}
                      >
                        <Image
                          src={`${appConfig.imageUrl}${selectedCollection.image?.url}`}
                          width={140}
                          alt={selectedCollection.name}
                          height={140}
                          layout="fixed"
                          onMouseEnter={() => setUploadPhoto(true)}
                          onMouseLeave={() => setUploadPhoto(false)}
                        />
                        <MdAddAPhoto
                          style={{
                            position: 'absolute',
                            fontSize: '10rem',
                            backgroundColor: 'rgb(0,0,0,0.8)',
                            width: '100%',
                            height: '100%',
                            display: uploadPhoto ? 'flex' : 'none',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={() => setUploadPhoto(true)}
                          onMouseLeave={() => setUploadPhoto(false)}
                        />
                      </Files>
                    </SpinnerContainer>
                  </div>

                  <div className="rn-author-info-content" style={{ textAlign: 'left' }}>
                    <h2 className="title-s">{selectedCollection.name}</h2>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-right">
                          <span style={{ fontSize: '14px' }}>Last update: {lastUpdateDate}</span>
                        </Tooltip>
                      }
                    >
                      <span>
                        Owned By{' '}
                        <span className="collection-owner-text">
                          {formattedAddress(selectedCollection.owner.address)}
                        </span>
                      </span>
                    </OverlayTrigger>
                    <p className="mt-3">{selectedCollection.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionIntroductionComponent;
