import CollectionComponent from '@components/collections/collection.component';
import CollectionsFilter from '@components/collections/collections-filter.component';

const CollectionsContainer = () => (
  <div className="container mt-4">
    <div className="mb-5">
      <CollectionsFilter />
    </div>
    <div className="row g-4">
      <div className="col-3">
        <CollectionComponent />
      </div>
      <div className="col-3">
        <CollectionComponent />
      </div>
      <div className="col-3">
        <CollectionComponent />
      </div>
      <div className="col-3">
        <CollectionComponent />
      </div>
      <div className="col-3">
        <CollectionComponent />
      </div>
      <div className="col-3">
        <CollectionComponent />
      </div>
      <div className="col-3">
        <CollectionComponent />
      </div>
      <div className="col-3">
        <CollectionComponent />
      </div>
    </div>
  </div>
);

export default CollectionsContainer;
