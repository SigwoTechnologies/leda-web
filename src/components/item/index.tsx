import ProductBid from '@components/product-bid';
import ShareDropdown from '@components/share-dropdown';
import Button from '@ui/button';
import { Author, Image as ImageType, Price, Tag } from '@types';
import Anchor from '@ui/anchor';
import ClientAvatar from '@ui/client-avatar';
import CountdownTimer from '@ui/countdown/count-down-timer';
import clsx from 'clsx';
import { useState } from 'react';
import { BuyModal } from '@components/modals/buy-modal/buy-modal';
import { selectAuthState } from '../../features/auth/store/auth.slice';
import useAppSelector from '../../store/hooks/useAppSelector';

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
  isCreator?: boolean;
  tags?: Tag[];
  tagsCreatePage?: string[];
  owner?: {
    address: string;
  };
  status?: number;
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
  owner,
  image,
  imageString,
  bitCount,
  authors,
  placeBid,
  disableShareDropdown,
  imageHeight = 384,
  imageWidth = 384,
  imageQuality = 85,
  isCreator = false,
  tagsCreatePage,
  tags,
  status,
}: Props) => {
  const [showBidModal, setShowBidModal] = useState(false);
  const handleBidModal = () => {
    setShowBidModal((prev) => !prev);
  };
  const { address } = useAppSelector(selectAuthState);

  const isOwner: boolean = address === String(owner?.address);

  return (
    <>
      <div
        className={clsx('product-style-one', !overlay && 'no-overlay', placeBid && 'with-placeBid')}
      >
        <div className="card-thumbnail">
          {imageString && !isCreator ? (
            <Anchor path={`/item/${itemId}`}>
              <img
                src={`${imageString}?img-width=${imageWidth}&img-height=${imageHeight}&img-fit=${'crop'}&img-quality=${imageQuality}`}
                alt={`${title}#${tokenId} - Leda Marketplace.`}
              />
            </Anchor>
          ) : (
            <img src={imageString} alt="Leda MarketPlace." />
          )}

          {auctionDate ? <CountdownTimer date={auctionDate} /> : null}
          {placeBid && (
            <Button onClick={handleBidModal} size="small">
              Place Bid
            </Button>
          )}
        </div>
        <div className="mt-4">
          <div className="profile-share">
            {authors?.map((client: Author) => (
              <ClientAvatar
                key={client.name}
                slug={client.slug}
                name={client.name}
                image={client.image}
              />
            ))}
          </div>
          <div className="d-flex mt-5 align-items-center justify-content-between">
            <div>{isOwner && <span>You own this NFT</span>}</div>
            <div>{!disableShareDropdown && <ShareDropdown itemId={itemId} />}</div>
          </div>
        </div>
        {isCreator ? (
          <h5 className="product-name">
            {title} - #{tokenId}
          </h5>
        ) : (
          <Anchor path={`/item/${itemId}`}>
            <span className="product-name">
              {title} - #{itemId?.slice(0, 4)}
            </span>
          </Anchor>
        )}
        <div className="d-flex gap-2 flex-wrap">
          {tags &&
            tags.map((tag) => (
              <p key={tag.id} style={{ marginBottom: '0' }}>
                <span className="badge rounded-pill bg-success">{tag.name}</span>
              </p>
            ))}
          {!tags && tagsCreatePage
            ? tagsCreatePage.map((tag) => (
                <p key={tag} style={{ marginBottom: '0' }}>
                  <span className="badge rounded-pill bg-success">{tag}</span>
                </p>
              ))
            : null}
        </div>
        <ProductBid
          price={{ amount: price, currency: 'ETH' } as Price}
          status={Number(status)}
          likeCount={likeCount}
        />
      </div>
      <BuyModal show={showBidModal} handleModal={handleBidModal} />
    </>
  );
};
export default Product;
