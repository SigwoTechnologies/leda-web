import ItemCollectionFilter from '@components/collections/items-collection-filter.component';
import InfiniteScroll from '@components/common/InfiniteScroll';
import { ItemCard } from '@components/ItemCard';
import NoSearchResults from '@containers/marketplace/no-search-results';
import { findPagedCollectionItems } from '@features/collections/store/collections.actions';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import { useCallback } from 'react';
import { Item as ItemType } from '../../../types/item';

export const ItemsArea = () => {
  const dispatch = useAppDispatch();
  const { isPagingLoading, itemsCount, items, selectedCollection, filters } = useAppSelector(
    (state) => state.marketplace
  );
  const hasMore = items.length < itemsCount;

  const handleNext = useCallback(() => {
    if (hasMore) {
      const newPage = Math.floor(items.length / filters.limit + 1);
      const newFilters = { ...filters, page: newPage };
      dispatch(
        findPagedCollectionItems({ collectionId: selectedCollection.id, filters: newFilters })
      );
    }
  }, [dispatch, filters, hasMore, items.length, selectedCollection.id]);

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

  if (!itemsCount) return <NoSearchResults />;

  return (
    <div className="mt-5">
      <div
        className="row container justify-content-center"
        style={{ padding: '0', margin: 'auto' }}
      >
        <div className="col-3" style={{ padding: '0' }}>
          <ItemCollectionFilter />
        </div>
        <div className="col-9" style={{ padding: '0' }}>
          <SpinnerContainer isLoading={isPagingLoading}>
            <div className="row g-5">
              <InfiniteScroll infiniteScrollSettings={infiniteScrollSettings}>
                <div className="row g-5">
                  {items.map((item: ItemType) => (
                    <div key={item.itemId} className="col-6 col-lg-3 col-md-7 col-sm-6 col-12">
                      <ItemCard item={item} />
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          </SpinnerContainer>
        </div>
      </div>
    </div>
  );
};
