import CollectionComponent from '@components/collections/collection.component';

const CollectionsContainer = () => (
  <div className="container mt-4">
    <div className="d-flex" style={{ gap: '20px' }}>
      <CollectionComponent />
      <CollectionComponent />
      <CollectionComponent />
      <CollectionComponent />
    </div>
  </div>
);

export default CollectionsContainer;
