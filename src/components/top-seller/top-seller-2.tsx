import Image from 'next/image';
import clsx from 'clsx';
import Anchor from '@ui/anchor';
import { ImageType } from '../../types/image';

type Props = {
  name: string;
  time?: string;
  path: string;
  eth?: string;
  image: ImageType;
  isVerified?: boolean;
};

const TopSeller2 = ({ name, time, path, image, eth, isVerified }: Props) => (
  <div className="top-seller-inner-one">
    <div className="top-seller-wrapper">
      {image?.src && (
        <div className={clsx('thumbnail', isVerified && 'varified')}>
          <Anchor path={path}>
            <Image
              src={image.src}
              alt={image?.alt || 'Nft_Profile'}
              width={image?.width || 50}
              height={image?.height || 50}
              layout="fixed"
            />
          </Anchor>
        </div>
      )}
      <div className="top-seller-content">
        <span>
          {eth && <>{`${eth} ETH`} by</>}
          <Anchor path={path}>{name}</Anchor>
        </span>
        {time && <span className="count-number">{time}</span>}
      </div>
    </div>
  </div>
);

export default TopSeller2;
