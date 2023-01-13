import InfiniteScroll from '@components/common/InfiniteScroll';
import { ItemCard } from '@components/ItemCard';
import { useCallback } from 'react';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { findPagedItems } from '../../features/marketplace/store/marketplace.actions';
import { Item } from '../../types/item';

export const MarketplaceArea = () => {
  const dispatch = useAppDispatch();
  const {
    filters: marketplaceFilters,
    items,
    itemsCount,
    isPagingLoading,
  } = useAppSelector((state) => state.marketplace);

  const hasMore = items.length < itemsCount;

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
    <InfiniteScroll infiniteScrollSettings={infiniteScrollSettings}>
      <div className="rn-product-area rn-section-gapTop">
        <div className="row g-5">
          {items.map((item: Item) => (
            <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};
