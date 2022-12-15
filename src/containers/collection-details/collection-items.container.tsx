import CollectionItemsComponent from '@components/collections/collection-items.component';
import ItemCollectionFilter from '@components/collections/items-collection-filter.component';
import NoSearchResults from '@containers/marketplace/no-search-results';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import { useMemo } from 'react';
import useAppSelector from '../../store/hooks/useAppSelector';

const CollectionItemsContainer = () => {
  const { itemsPagination, isCollectionNftsLoading } = useAppSelector(
    (state) => state.collections.collectionItemsFiltering
  );

  const renderedComponent = useMemo(() => {
    if (itemsPagination.items.length) return <CollectionItemsComponent />;

    if (!isCollectionNftsLoading) return <NoSearchResults />;

    return null;
  }, [itemsPagination.items.length, isCollectionNftsLoading]);

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
          <SpinnerContainer isLoading={isCollectionNftsLoading}>
            {renderedComponent}
          </SpinnerContainer>
        </div>
      </div>
    </div>
  );
};

export default CollectionItemsContainer;
