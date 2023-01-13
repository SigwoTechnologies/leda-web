import CollectionsFilter from '@components/collections/collections-filter.component';
import InfiniteScroll from '@components/common/InfiniteScroll';
import { findPagedCollections } from '@features/collections/store/collections.actions';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import Link from 'next/link';
import { useCallback } from 'react';
import { ICollection } from '../../types/ICollection';
import { CollectionCard } from './collection-card';

export const CollectionsContainer = () => {
  const dispatch = useAppDispatch();
  const {
    collections,
    collectionsCount,
    isLoadingCollections,
    collectionsFilters,
    isPagingLoading,
  } = useAppSelector((state) => state.marketplace);

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

  if (!collectionsCount)
    return (
      <p className="text-no-collections">
        <b>
          There are no Collections to show <br />
          <Link href="/create">
            <span className="create-nft-button">Create One!</span>
          </Link>
        </b>
      </p>
    );

  return (
    <div className="container mt-4" style={{ minHeight: '100vh' }}>
      <div className="mb-5">{!!collectionsCount && <CollectionsFilter />}</div>
      <SpinnerContainer isLoading={isLoadingCollections}>
        <InfiniteScroll infiniteScrollSettings={infiniteScrollSettings}>
          <div
            className="row g-4"
            data-sal-delay="15"
            data-sal="slide-down"
            data-sal-duration="800"
          >
            {collections.map((collection: ICollection) => (
              <div className="col-lg-3 col-md-6 col-sm-12" key={collection.id}>
                <CollectionCard collection={collection} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </SpinnerContainer>
    </div>
  );
};
