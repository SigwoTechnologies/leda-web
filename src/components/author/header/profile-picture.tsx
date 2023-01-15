import { changeProfilePicture } from '@features/auth/store/account.actions';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { openToastError, openToastInfo } from '@store/ui/ui.slice';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import Image from 'next/image';
import { useState } from 'react';
import Files from 'react-files';
import { MdAddAPhoto } from 'react-icons/md';
import appConfig from '../../../common/configuration/app.config';

export const ProfilePicture = () => {
  const dispatch = useAppDispatch();
  const { account, isLoading } = useAppSelector((state) => state.auth);
  const [uploadPhoto, setUploadPhoto] = useState(false);

  const handleSelectFile = async ([file]: [File]) => {
    if (!file) return;
    dispatch(openToastInfo('Uploading image, please wait'));
    dispatch(changeProfilePicture(file));
  };

  const onFilesError = (error: Error) => {
    dispatch(
      openToastError(
        `${error.message}${error.message.includes(' is too large') ? ', maximum size 100.6MB' : ''}`
      )
    );
  };

  return (
    <div className="user-thumbnail">
      <SpinnerContainer isLoading={isLoading}>
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
            src={
              account.picture?.url
                ? `${appConfig.imageUrl}${account.picture?.url}`
                : '/images/avatars/1.png'
            }
            width={140}
            alt={account.address}
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
  );
};
