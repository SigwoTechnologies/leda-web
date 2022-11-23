import CollectionItemsComponent from '@components/collections/collection-items.component';
import ItemCollectionFilter from '@components/collections/items-collection-filter.component';

const CollectionItemsContainer = () => (
  <div className="row" style={{ position: 'sticky' }}>
    <div className="col-3">
      <ItemCollectionFilter />
    </div>
    <div className="col-9">
      <CollectionItemsComponent />
    </div>
  </div>
);

export default CollectionItemsContainer;
