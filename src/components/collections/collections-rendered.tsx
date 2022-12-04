import InfiniteScroll from '@components/common/InfiniteScroll';
import { useCallback } from 'react';
import { findPagedCollections } from '../../features/collections/store/collections.actions';
import { selectCollectionsState } from '../../features/collections/store/collections.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { ICollection } from '../../types/ICollection';
import CollectionComponent from './collection.component';

const CollectionRendered = () => {
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
    endMessageDisplay: 'Looking for more Collections?',
    endMessageLink: '/create',
    endMessageLinkDetails: 'Create one!',
  };

  return (
    <InfiniteScroll infiniteScrollSettings={infiniteScrollSettings}>
      <div className="row g-4 ">
        {collections.map((collection: ICollection) => (
          <div className="col-3" key={collection.id}>
            <CollectionComponent
              collectionBanner={collection.items[0].image.url}
              colId={collection.id}
              ownerAddress={collection.owner.address}
              itemsQty={collection.items.length}
              colTitle={collection.name}
            />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default CollectionRendered;
