import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Anchor from '@ui/anchor';
import CountdownTimer from '@ui/countdown/count-down-timer';
import ClientAvatar from '@ui/client-avatar';
import ShareDropdown from '@components/share-dropdown';
import ProductBid from '@components/product-bid';
import Button from '@ui/button';
import PlaceBidModal from '@components/modals/placebid-modal';
import { Author, Image as ImageType, Price } from '@types';

type Props = {
  overlay?: boolean;
  title: string;
  slug: string;
  latestBid: string;
  price: Price;
  likeCount: number;
  auctionDate?: string;
  image: ImageType;
  authors: Author[];
  bitCount?: number;
  placeBid?: boolean;
  disableShareDropdown?: boolean;
};

const Product = ({
  overlay = false,
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
}: Props) => {
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
            {authors?.map((client: Author) => (
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

export default Product;
