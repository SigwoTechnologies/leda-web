import CollectionsFilter from '@components/collections/collections-filter.component';
import CollectionRendered from '@components/collections/collections-rendered';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import Link from 'next/link';
import { useMemo } from 'react';
import useAppSelector from '../../store/hooks/useAppSelector';

const CollectionsContainer = () => {
  const { collections, collectionsCount, isLoadingCollections } = useAppSelector(
    (state) => state.marketplace
  );

  const renderedComponent = useMemo(() => {
    if (collections.length) return <CollectionRendered />;
    if (collectionsCount === 0)
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

    return null;
  }, [collections.length, collectionsCount]);

  return (
    <div className="container mt-4" style={{ minHeight: '100vh' }}>
      <div className="mb-5">{!!collectionsCount && <CollectionsFilter />}</div>
      <SpinnerContainer isLoading={isLoadingCollections}>{renderedComponent}</SpinnerContainer>
    </div>
  );
};

export default CollectionsContainer;
