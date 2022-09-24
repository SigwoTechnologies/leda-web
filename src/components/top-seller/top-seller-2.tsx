import Image from 'next/image';
import clsx from 'clsx';
import Anchor from '@ui/anchor';

// TODO: Type props
const TopSeller2 = ({ name, time, path, image, eth, isVarified }: any) => (
  <div className="top-seller-inner-one">
    <div className="top-seller-wrapper">
      {image?.src && (
        <div className={clsx('thumbnail', isVarified && 'varified')}>
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
          {eth && <>{eth} by</>}
          <Anchor path={path}>{name}</Anchor>
        </span>
        {time && <span className="count-number">{time}</span>}
      </div>
    </div>
  </div>
);

export default TopSeller2;
