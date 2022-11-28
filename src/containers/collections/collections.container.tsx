import CollectionComponent from '@components/collections/collection.component';
import CollectionsFilter from '@components/collections/collections-filter.component';
import InfiniteScroll from '@components/common/InfiniteScroll';
import { useCallback } from 'react';
import { findPagedCollections } from '../../features/collections/store/collections.actions';
import { selectCollectionsState } from '../../features/collections/store/collections.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';

const CollectionsContainer = () => {
  const dispatch = useAppDispatch();
  const { collectionsFilters, collectionPagination, isPagingLoading } =
    useAppSelector(selectCollectionsState);
  const { collections, totalCount } = collectionPagination;

  const hasMore = collections.length < totalCount;

  const handleNext = useCallback(() => {
    if (hasMore) {
      const newPage = Math.floor(collections.length / collectionsFilters.limit + 1);
      dispatch(findPagedCollections({ ...collectionsFilters, page: newPage }));
    }
  }, [dispatch, hasMore, collectionsFilters, collections]);

  const infiniteScrollSettings = {
    style: { overflow: 'inherit' },
    dataLength: collections.length,
    handleNext,
    hasMore,
    loading: isPagingLoading,
    endMessageDisplay: 'Looking for more NFTs?',
    endMessageLink: '/create',
    endMessageLinkDetails: 'Create one!',
  };

  return (
    <div className="container mt-4" style={{ height: '100vh' }}>
      <div className="mb-5">
        <CollectionsFilter />
      </div>
      <InfiniteScroll infiniteScrollSettings={infiniteScrollSettings}>
        <div className="row g-4 ">
          {collections.map((collection) => (
            <div className="col-3" key={collection.id}>
              <CollectionComponent
                colId={collection.id}
                // ownerAddress={collection.owner.address}
                itemsQty={collection.items.length}
                colTitle={collection.name}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default CollectionsContainer;
