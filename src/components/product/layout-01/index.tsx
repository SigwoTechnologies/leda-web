import { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import clsx from 'clsx';
import Anchor from '@ui/anchor';
import CountdownTimer from '@ui/countdown/layout-01';
import ClientAvatar from '@ui/client-avatar';
import ShareDropdown from '@components/share-dropdown';
import ProductBid from '@components/product-bid';
import Button from '@ui/button';
import { ImageType } from '@utils/types';
import PlaceBidModal from '@components/modals/placebid-modal';

// TODO: Type props and any types
const Product = ({
  overlay,
  title,
  slug,
  latestBid,
  price,
  likeCount,
  auctionDate,
  image,
  bitCount,
  authors,
  placeBid,
  disableShareDropdown,
}: any) => {
  const [showBidModal, setShowBidModal] = useState(false);
  const handleBidModal = () => {
    setShowBidModal((prev) => !prev);
  };
  return (
    <>
      <div
        className={clsx('product-style-one', !overlay && 'no-overlay', placeBid && 'with-placeBid')}
      >
        <div className="card-thumbnail">
          {image?.src && (
            <Anchor path={`/product/${slug}`}>
              <Image src={image.src} alt={image?.alt || 'NFT_portfolio'} width={533} height={533} />
            </Anchor>
          )}
          {auctionDate && <CountdownTimer date={auctionDate} />}
          {placeBid && (
            <Button onClick={handleBidModal} size="small">
              Place Bid
            </Button>
          )}
        </div>
        <div className="product-share-wrapper">
          <div className="profile-share">
            {authors?.map((client: any) => (
              <ClientAvatar
                key={client.name}
                slug={client.slug}
                name={client.name}
                image={client.image}
              />
            ))}
            <Anchor className="more-author-text" path={`/product/${slug}`}>
              {bitCount}+ Place Bit.
            </Anchor>
          </div>
          {!disableShareDropdown && <ShareDropdown />}
        </div>
        <Anchor path={`/product/${slug}`}>
          <span className="product-name">{title}</span>
        </Anchor>
        <span className="latest-bid">Highest bid {latestBid}</span>
        <ProductBid price={price} likeCount={likeCount} />
      </div>
      <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
    </>
  );
};

Product.propTypes = {
  overlay: PropTypes.bool,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  latestBid: PropTypes.string.isRequired,
  price: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  likeCount: PropTypes.number.isRequired,
  auctionDate: PropTypes.string,
  image: ImageType.isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      image: ImageType.isRequired,
    })
  ),
  bitCount: PropTypes.number,
  placeBid: PropTypes.bool,
  disableShareDropdown: PropTypes.bool,
};

Product.defaultProps = {
  overlay: false,
};

export default Product;
