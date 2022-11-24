import CollectionItemsComponent from '@components/collections/collection-items.component';
import ItemCollectionFilter from '@components/collections/items-collection-filter.component';

const CollectionItemsContainer = () => (
  <div className="row container justify-content-center" style={{ padding: '0', margin: 'auto' }}>
    <div className="col-3" style={{ padding: '0' }}>
      <ItemCollectionFilter />
    </div>
    <div className="col-9" style={{ padding: '0' }}>
      <CollectionItemsComponent />
    </div>
  </div>
);

export default CollectionItemsContainer;
