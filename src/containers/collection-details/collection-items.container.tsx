import CollectionItemsComponent from '@components/collections/collection-items.component';
import ItemCollectionFilter from '@components/collections/items-collection-filter.component';
import NoSearchResults from '@containers/marketplace/no-search-results';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import { useMemo } from 'react';
import useAppSelector from '../../store/hooks/useAppSelector';

const CollectionItemsContainer = () => {
  const { isPagingLoading, items } = useAppSelector((state) => state.marketplace);

  const renderedComponent = useMemo(() => {
    if (items.length) return <CollectionItemsComponent />;

    if (!isPagingLoading) return <NoSearchResults />;

    return null;
  }, [items.length, isPagingLoading]);

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
          <SpinnerContainer isLoading={isPagingLoading}>{renderedComponent}</SpinnerContainer>
        </div>
      </div>
    </div>
  );
};

export default CollectionItemsContainer;
