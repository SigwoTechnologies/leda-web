/* eslint-disable @next/next/no-img-element */
import { ItemBid } from '@components/product-bid';
import ShareDropdown from '@components/share-dropdown';
import useAppSelector from '@store/hooks/useAppSelector';
import { Item } from '@types';
import Anchor from '@ui/anchor';
import { getFormattedName } from '@utils/getFormattedName';
import clsx from 'clsx';
import { useMemo } from 'react';
import appConfig from '../common/configuration/app.config';
import { selectAuthState } from '../features/auth/store/auth.slice';

type Props = {
  overlay?: boolean;
  item: Item;
};

export const ItemCard = ({ overlay = false, item }: Props) => {
  const { likedItems } = useAppSelector((state) => state.marketplace);
  const {
    account: { address },
  } = useAppSelector((state) => state.auth);

  const isLiked = useMemo(
    () => Boolean(likedItems.find((likedItem) => likedItem.itemId === item.itemId)),
    [item.itemId, likedItems]
  );

  const isOwner: boolean = address === String(item.owner?.address);

  return (
    <div className={clsx('product-style-one', !overlay && 'no-overlay')}>
      {item.isLazy && (
        <div className="ribbon ribbon-top-right">
          <span>Lazy</span>
        </div>
      )}
      <div className="card-thumbnail">
        {item.image?.url ? (
          <Anchor path={`/item/${item.itemId}`}>
            <img
              src={`${appConfig.imageUrl}${item.image?.url}?img-width=384&img-height=384&img-fit=crop&img-quality=50`}
              alt={`${item.name} NFT - Leda Marketplace.`}
            />
          </Anchor>
        ) : (
          <img src={item.image?.url} alt="Leda MarketPlace." className="image-creator" />
        )}
      </div>
      <div className="mt-4">
        <div className="d-flex mt-5 align-items-center justify-content-between">
          <div>{isOwner && <span>You own this NFT</span>}</div>
          <div>
            <ShareDropdown collectionId={item.collection.id} itemId={item.itemId} />
          </div>
        </div>
      </div>

      <Anchor path={`/item/${item.itemId}`}>
        <span className="product-name">{getFormattedName(item.name)}</span>
      </Anchor>

      <div className="d-flex gap-2 flex-wrap">
        {!!item.tags.length &&
          item.tags.map((tag) => (
            <p key={tag.id} style={{ marginBottom: '0' }}>
              <span className="badge rounded-pill bg-success">{tag.name}</span>
            </p>
          ))}
      </div>
      <ItemBid
        itemId={item.itemId}
        isLiked={isLiked}
        price={{ amount: Number(item.price), currency: 'ETH' }}
        status={Number(item.status)}
        likeCount={item.likes}
      />
    </div>
  );
};
