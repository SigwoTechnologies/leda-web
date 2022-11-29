import CollectionsFilter from '@components/collections/collections-filter.component';
import CollectionRendered from '@components/collections/collections-rendered';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import { useMemo } from 'react';
import { selectCollectionsState } from '../../features/collections/store/collections.slice';
import useAppSelector from '../../store/hooks/useAppSelector';

const CollectionsContainer = () => {
  const { collectionPagination, isLoadingCollections } = useAppSelector(selectCollectionsState);

  const renderedComponent = useMemo(() => {
    if (collectionPagination.collections.length) return <CollectionRendered />;

    return null;
  }, [collectionPagination.collections.length]);

  return (
    <div className="container mt-4">
      <div className="mb-5">{!!collectionPagination.totalCount && <CollectionsFilter />}</div>
      <SpinnerContainer isLoading={isLoadingCollections}>{renderedComponent}</SpinnerContainer>
    </div>
  );
};

export default CollectionsContainer;
