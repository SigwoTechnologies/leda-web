import { BuyModal } from '@components/modals/buy-modal/buy-modal';
import ProductBid from '@components/product-bid';
import ShareDropdown from '@components/share-dropdown';
import { Author, Price, Tag } from '@types';
import Anchor from '@ui/anchor';
import Button from '@ui/button';
import ClientAvatar from '@ui/client-avatar';
import CountdownTimer from '@ui/countdown/count-down-timer';
import { getFormattedName } from '@utils/getFormattedName';
import clsx from 'clsx';
import { useMemo } from 'react';
import { selectLikedItems } from '../../features/account/store/account.slice';
import { selectAuthState } from '../../features/auth/store/auth.slice';
import { setIsModalOpen } from '../../features/marketplace/store/marketplace.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import appConfig from '../../common/configuration/app.config';

type Props = {
  overlay?: boolean;
  itemId: string;
  title: string;
  tokenId?: number;
  price?: number;
  likeCount: number;
  auctionDate?: string;
  imageString?: string;
  authors?: Author[];
  placeBid?: boolean;
  disableShareDropdown?: boolean;
  imageWidth?: number;
  imageHeight?: number;
  imageQuality?: number;
  isCreator?: boolean;
  tags?: Tag[];
  collectionId?: string;
  tagsCreatePage?: string[];
  owner?: {
    address: string;
  };
  status?: number;
  isLazy: boolean;
};
const Product = ({
  overlay = false,
  itemId,
  title,
  tokenId,
  price,
  likeCount,
  auctionDate,
  collectionId = '',
  owner,
  imageString,
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
  isLazy,
}: Props) => {
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector((state) => state.marketplace);
  const likedItems = useAppSelector(selectLikedItems);
  const handleBuyModal = () => {
    dispatch(setIsModalOpen(!isModalOpen));
  };
  const { address } = useAppSelector(selectAuthState);

  const isLiked = useMemo(
    () => Boolean(likedItems.find((likedItem) => likedItem.itemId === itemId)),
    [itemId, likedItems]
  );

  const isOwner: boolean = address === String(owner?.address);

  return (
    <>
      <div
        className={clsx('product-style-one', !overlay && 'no-overlay', placeBid && 'with-placeBid')}
      >
        {isLazy && (
          <div className="ribbon ribbon-top-right">
            <span>Lazy</span>
          </div>
        )}
        <div className="card-thumbnail">
          {imageString && !isCreator ? (
            <Anchor path={`/item/${itemId}`}>
              <img
                src={`${
                  appConfig.imageUrl
                }${imageString}?img-width=${imageWidth}&img-height=${imageHeight}&img-fit=${'crop'}&img-quality=${imageQuality}`}
                alt={`${title} NFT - Leda Marketplace.`}
              />
            </Anchor>
          ) : (
            <img
              src={`${appConfig.imageUrl}${imageString}`}
              alt="Leda MarketPlace."
              className="image-creator"
            />
          )}

          {auctionDate ? <CountdownTimer date={auctionDate} /> : null}
          {placeBid && (
            <Button onClick={handleBuyModal} size="small">
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
            <div>
              {!disableShareDropdown && (
                <ShareDropdown collectionId={collectionId} itemId={itemId} />
              )}
            </div>
          </div>
        </div>
        {isCreator ? (
          <h5 className="product-name">
            {getFormattedName(title)} - #{tokenId}
          </h5>
        ) : (
          <Anchor path={`/item/${itemId}`}>
            <span className="product-name">
              {getFormattedName(title)} - #{itemId?.slice(0, 4)}
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
          itemId={itemId}
          isLiked={isLiked}
          price={{ amount: price, currency: 'ETH' } as Price}
          status={Number(status)}
          likeCount={likeCount}
        />
      </div>
      <BuyModal handleModal={handleBuyModal} />
    </>
  );
};
export default Product;
