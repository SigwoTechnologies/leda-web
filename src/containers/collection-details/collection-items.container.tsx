import CollectionItemsComponent from '@components/collections/collection-items.component';
import ItemCollectionFilter from '@components/collections/items-collection-filter.component';
import NoSearchResults from '@containers/marketplace/no-search-results';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import { useEffect, useMemo } from 'react';
import {
  findFilteredCollectionItems,
  findPriceRange,
} from '../../features/collections/store/collections.actions';
import {
  resetCollectionsNftFilters,
  selectCurrentSelection,
  selectCurrentSelectionItemsFiltering,
} from '../../features/collections/store/collections.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';

const CollectionItemsContainer = () => {
  const dispatch = useAppDispatch();
  const { itemsFilters, itemsPagination, isCollectionNftsLoading } = useAppSelector(
    selectCurrentSelectionItemsFiltering
  );

  useEffect(() => {
    dispatch(resetCollectionsNftFilters());
  }, [dispatch]);

  const {
    collection: { id },
  } = useAppSelector(selectCurrentSelection);

  useEffect(() => {
    const itemsWithPrice = itemsPagination.items.filter((item) => item.price !== null);

    if (itemsWithPrice.length && itemsPagination.totalCount) {
      dispatch(findPriceRange(id));
    }
  }, [dispatch, itemsPagination.totalCount, id, itemsPagination.items]);

  useEffect(() => {
    dispatch(
      findFilteredCollectionItems({
        collectionId: id,
        filters: itemsFilters,
      })
    );
  }, [dispatch, id, itemsFilters]);

  const renderedComponent = useMemo(() => {
    if (itemsPagination.items.length) return <CollectionItemsComponent />;

    if (!isCollectionNftsLoading) return <NoSearchResults />;

    return null;
  }, [itemsPagination.items.length, isCollectionNftsLoading]);

  const [priceFrom, priceTo] = useMemo(() => {
    if (+itemsFilters.cheapest >= 0 && +itemsFilters.mostExpensive >= 0) {
      return [itemsFilters.cheapest, itemsFilters.mostExpensive];
    }
    return [-1, -1];
  }, [itemsFilters.cheapest, itemsFilters.mostExpensive]);

  return (
    <div className="row container justify-content-center" style={{ padding: '0', margin: 'auto' }}>
      <div className="col-3" style={{ padding: '0' }}>
        {!!itemsPagination.totalCount && (
          <ItemCollectionFilter cheapest={+priceFrom} mostExpensive={+priceTo} />
        )}
      </div>
      <div className="col-9" style={{ padding: '0' }}>
        <SpinnerContainer isLoading={isCollectionNftsLoading}>{renderedComponent}</SpinnerContainer>
      </div>
    </div>
  );
};

export default CollectionItemsContainer;
