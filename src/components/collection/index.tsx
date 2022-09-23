import Anchor from '@ui/anchor';
import Image from 'next/image';

// TODO: Type props and any types
const Collection = ({ title, totalItem, image, thumbnails, profileImage, path }: any) => (
  <Anchor path={path} className="rn-collection-inner-one">
    <div className="collection-wrapper">
      {image?.src && (
        <div className="collection-big-thumbnail">
          <Image src={image.src} alt={image?.alt || 'Nft_Profile'} width={507} height={339} />
        </div>
      )}
      <div className="collenction-small-thumbnail">
        {thumbnails?.map((thumb: any, i: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i}>
            <Image src={thumb?.src} alt={thumb?.alt || 'Nft_Profile'} width={164} height={110} />
          </div>
        ))}
      </div>
      {profileImage?.src && (
        <div className="collection-profile">
          <Image
            src={profileImage.src}
            alt={profileImage?.alt || 'Nft_Profile'}
            width={80}
            height={80}
          />
        </div>
      )}

      <div className="collection-deg">
        <h6 className="title">{title}</h6>
        <span className="items">{totalItem} items</span>
      </div>
    </div>
  </Anchor>
);

export default Collection;
