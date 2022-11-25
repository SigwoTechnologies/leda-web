import CollectionComponent from '@components/collections/collection.component';
import CollectionsFilter from '@components/collections/collections-filter.component';
import { selectCollectionsState } from '../../features/collections/store/collections.slice';
import useAppSelector from '../../store/hooks/useAppSelector';

const CollectionsContainer = () => {
  const { collections } = useAppSelector(selectCollectionsState);

  return (
    <div className="container mt-4" style={{ height: '100vh' }}>
      <div className="mb-5">
        <CollectionsFilter />
      </div>
      <div className="row g-4 ">
        {collections.map((collection) => (
          <div className="col-3" key={collection.id}>
            <CollectionComponent
              colId={collection.id}
              // ownerAddress={collection.owner.address}
              itemsQty={collection.items.length}
              colTitle={collection.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsContainer;
