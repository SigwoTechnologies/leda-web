import CollectionsFilter from '@components/collections/collections-filter.component';
import CollectionRendered from '@components/collections/collections-rendered';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import Link from 'next/link';
import { useMemo } from 'react';
import { selectCollectionsState } from '../../features/collections/store/collections.slice';
import useAppSelector from '../../store/hooks/useAppSelector';

const CollectionsContainer = () => {
  const { collectionPagination, isLoadingCollections } = useAppSelector(selectCollectionsState);

  const renderedComponent = useMemo(() => {
    if (collectionPagination.collections.length) return <CollectionRendered />;
    if (collectionPagination.totalCount === 0)
      return (
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '30px', color: '#fff' }}>
          <b>
            There are no Collections to show <br />
            <Link href="/create">
              <span className="create-nft-button">Create One!</span>
            </Link>
          </b>
        </p>
      );

    return null;
  }, [collectionPagination.collections.length, collectionPagination.totalCount]);

  return (
    <div className="container mt-4" style={{ minHeight: '100vh' }}>
      <div className="mb-5">{!!collectionPagination.totalCount && <CollectionsFilter />}</div>
      <SpinnerContainer isLoading={isLoadingCollections}>{renderedComponent}</SpinnerContainer>
    </div>
  );
};

export default CollectionsContainer;
