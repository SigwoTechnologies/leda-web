import InfiniteScroll from '@components/common/InfiniteScroll';
import Item from '@components/item';
import { Item as ItemType } from '@types';
import { useCallback } from 'react';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { findPagedItems } from '../../features/marketplace/store/marketplace.actions';

export const MarketplaceArea = () => {
  const dispatch = useAppDispatch();
  const {
    filters: marketplaceFilters,
    items,
    itemsCount: count,
    isPagingLoading,
  } = useAppSelector((state) => state.marketplace);

  const hasMore = items.length < count;

  const handleNext = useCallback(() => {
    if (hasMore) {
      const newPage = Math.floor(items.length / marketplaceFilters.limit + 1);
      dispatch(findPagedItems({ ...marketplaceFilters, page: newPage }));
    }
  }, [dispatch, hasMore, marketplaceFilters, items]);

  const infiniteScrollSettings = {
    style: { overflow: 'inherit' },
    dataLength: items.length,
    handleNext,
    hasMore,
    loading: isPagingLoading,
    endMessageDisplay: 'Looking for more NFTs?',
    endMessageLink: '/create',
    endMessageLinkDetails: 'Create one!',
  };

  return (
    <div className="rn-product-area rn-section-gapTop">
      <div className="row g-5">
        <InfiniteScroll infiniteScrollSettings={infiniteScrollSettings}>
          <div className="row g-5">
            {items.map((item: ItemType) => (
              <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                <Item
                  title={item.name}
                  itemId={item.itemId}
                  collectionId={item.collection.id}
                  tokenId={item.tokenId}
                  owner={item.owner}
                  tags={item.tags}
                  price={Number(item.price)}
                  status={item.status}
                  likeCount={item.likes}
                  imageString={item.image?.url}
                  isLazy={item.isLazy}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
