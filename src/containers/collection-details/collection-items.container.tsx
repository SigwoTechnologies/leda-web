import CollectionItemsComponent from '@components/collections/collection-items.component';
import ItemCollectionFilter from '@components/collections/items-collection-filter.component';
import { useMemo } from 'react';
import { selectCurrentSelectionItemsFiltering } from '../../features/collections/store/collections.slice';
import useAppSelector from '../../store/hooks/useAppSelector';

const CollectionItemsContainer = () => {
  const { itemsFilters, itemsPagination } = useAppSelector(selectCurrentSelectionItemsFiltering);

  const [priceFrom, priceTo] = useMemo(() => {
    if (itemsFilters.cheapest >= 0 && itemsFilters.mostExpensive >= 0) {
      return [itemsFilters.cheapest, itemsFilters.mostExpensive];
    }
    return [-1, -1];
  }, [itemsFilters.cheapest, itemsFilters.mostExpensive]);

  return (
    <div className="row container justify-content-center" style={{ padding: '0', margin: 'auto' }}>
      <div className="col-3" style={{ padding: '0' }}>
        {/* {!!itemsPagination.totalCount && (
          <ItemCollectionFilter cheapest={+priceFrom} mostExpensive={+priceTo} />
        )} */}
        <ItemCollectionFilter cheapest={+priceFrom} mostExpensive={+priceTo} />
      </div>
      <div className="col-9" style={{ padding: '0' }}>
        <CollectionItemsComponent />
      </div>
    </div>
  );
};

export default CollectionItemsContainer;
