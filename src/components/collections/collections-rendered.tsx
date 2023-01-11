import InfiniteScroll from '@components/common/InfiniteScroll';
import { useCallback } from 'react';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { findPagedCollections } from '../../features/collections/store/collections.actions';
import { ICollection } from '../../types/ICollection';
import CollectionComponent from './collection.component';

const CollectionRendered = () => {
  const dispatch = useAppDispatch();
  const { collectionsFilters, isPagingLoading, collections, collectionsCount } = useAppSelector(
    (state) => state.marketplace
  );

  const hasMore = collections.length < collectionsCount;

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
          <div className="col-lg-3 col-md-6 col-sm-12" key={collection.id}>
            <CollectionComponent
              collectionBanner={collection.items[0]?.image}
              collectionCustomBanner="https://source.unsplash.com/random/800x1000"
              collectionThumbnail={collection.image?.url}
              colId={collection.id}
              ownerAddress={collection.owner?.address}
              itemsQty={collection.items?.length}
              colTitle={collection.name}
            />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default CollectionRendered;
