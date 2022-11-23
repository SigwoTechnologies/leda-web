import CollectionComponent from '@components/collections/collection.component';
import Anchor from '@ui/anchor';

const NewestCollectionArea = () => (
  <div className="container mt-5" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
    <div className="d-flex justify-content-between">
      <h3>Newest Collections</h3>
      <Anchor className="btn-transparent" path="/collections">
        VIEW ALL
        <i className="feather feather-arrow-right" />
      </Anchor>
    </div>
    <div className="d-flex" style={{ gap: '30px' }}>
      <CollectionComponent />
      <CollectionComponent />
      <CollectionComponent />
      <CollectionComponent />
    </div>
  </div>
);

export default NewestCollectionArea;
