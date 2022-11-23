import CollectionComponent from '@components/collections/collection.component';
import CollectionsFilter from '@components/collections/collections-filter.component';

const CollectionsContainer = () => (
  <div className="container mt-4">
    <div className="mb-5">
      <CollectionsFilter />
    </div>
    <div className="d-flex" style={{ gap: '30px' }}>
      <CollectionComponent />
      <CollectionComponent />
      <CollectionComponent />
      <CollectionComponent />
    </div>
  </div>
);

export default CollectionsContainer;
