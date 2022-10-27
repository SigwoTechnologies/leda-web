import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Anchor from '@ui/anchor';
import CountdownTimer from '@ui/countdown/count-down-timer';
import ClientAvatar from '@ui/client-avatar';
import ShareDropdown from '@components/share-dropdown';
import ProductBid from '@components/product-bid';
import Button from '@ui/button';
import PlaceBidModal from '@components/modals/item-modal';
import { Author, Image as ImageType, Price } from '@types';

type Props = {
  overlay?: boolean;
  itemId?: string;
  title: string;
  tokenId?: number;
  latestBid: string;
  price?: number;
  likeCount: number;
  auctionDate?: string;
  image?: ImageType;
  imageString?: string;
  authors?: Author[];
  bitCount?: number;
  placeBid?: boolean;
  disableShareDropdown?: boolean;
  imageWidth?: number;
  imageHeight?: number;
  imageQuality?: number;
};
const Product = ({
  overlay = false,
  itemId,
  title,
  tokenId,
  latestBid,
  price,
  likeCount,
  auctionDate,
  image,
  imageString,
  bitCount,
  authors,
  placeBid,
  disableShareDropdown,
  imageHeight = 384,
  imageWidth = 384,
  imageQuality = 85,
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
          {imageString ? (
            <Anchor path={`/item/${itemId}`}>
              <img
                src={`${imageString}?img-width=${imageWidth}&img-height=${imageHeight}&img-fit=${'crop'}&img-quality=${imageQuality}`}
                alt={`${title}#${tokenId} - Leda MarketPlace.`}
              />
            </Anchor>
          ) : null}
          {auctionDate ? <CountdownTimer date={auctionDate} /> : null}
          {placeBid ? (
            <Button onClick={handleBidModal} size="small">
              Place Bid
            </Button>
          ) : null}
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
            {/* <Anchor className="more-author-text" path={`/product/${slug}`}>
              {bitCount}+ Place Bit.
            </Anchor> */}
          </div>
          {!disableShareDropdown && <ShareDropdown />}
        </div>
        <Anchor path={`/item/${itemId}`}>
          <span className="product-name">
            #{tokenId} - {title}
          </span>
        </Anchor>
        {/* <span className="latest-bid">Highest bid {latestBid}</span> */}
        <ProductBid price={{ amount: price, currency: 'ETH' } as Price} likeCount={likeCount} />
      </div>
      <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
    </>
  );
};
export default Product;
