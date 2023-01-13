import { changeBackgroundPicture } from '@features/auth/store/account.actions';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { openToastError, openToastInfo } from '@store/ui/ui.slice';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import Image from 'next/image';
import { useState } from 'react';
import Files from 'react-files';
import { MdAddAPhoto } from 'react-icons/md';
import appConfig from '../../../common/configuration/app.config';

export const BackgroundPicture = () => {
  const dispatch = useAppDispatch();
  const { account, isLoading } = useAppSelector((state) => state.auth);
  const [uploadPhoto, setUploadPhoto] = useState(false);

  const handleSelectFile = async ([file]: [File]) => {
    if (!file) return;
    dispatch(openToastInfo('Uploading image, please wait'));
    dispatch(changeBackgroundPicture(file));
  };

  const onFilesError = (error: Error) => {
    dispatch(
      openToastError(
        `${error.message}${error.message.includes(' is too large') ? ', maximum size 100.6MB' : ''}`
      )
    );
  };

  return (
    <SpinnerContainer isLoading={isLoading}>
      <Files
        onChange={handleSelectFile}
        accepts={['image/*']}
        multiple
        maxFileSize={160000000}
        minFileSize={0}
        onError={onFilesError}
        clickable
        className="rn-author-bg-area position-relative ptb--150"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 5s ease-out',
        }}
      >
        <Image
          src={
            account.background?.url
              ? `${appConfig.imageUrl}${account.background?.url}`
              : 'https://source.unsplash.com/random/1920x300'
          }
          alt="Slider BG"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
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
  );
};
