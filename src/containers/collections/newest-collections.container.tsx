import CollectionComponent from '@components/collections/collection.component';
import Anchor from '@ui/anchor';
import { useMemo } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { selectCollectionsState } from '../../features/collections/store/collections.slice';
import useAppSelector from '../../store/hooks/useAppSelector';

const NotFound = () => (
  <div className="">
    <h5 className="text-center">No collections to show</h5>
  </div>
);

const NewestCollectionArea = () => {
  const { isLoadingCollections, collections } = useAppSelector(selectCollectionsState);

  const renderedComponent = useMemo(() => {
    if (collections.length === 0 && !isLoadingCollections) return <NotFound />;
    if (isLoadingCollections)
      return (
        <div className="d-flex align-items-center justify-content-center">
          <ClipLoader className="spinner" color="#35b049" />
        </div>
      );
    return (
      <div className="row g-4">
        {collections.map((collection) => (
          <div className="col-3" key={collection.id}>
            <CollectionComponent
              colId={collection.id}
              itemsQty={collection.items.length}
              colTitle={collection.name}
            />
          </div>
        ))}
      </div>
    );
  }, [collections, isLoadingCollections]);

  return (
    <div
      className="container mt-5"
      data-sal-delay="150"
      data-sal="slide-up"
      data-sal-duration="800"
    >
      <div className="d-flex justify-content-between">
        <h3>Newest Collections</h3>
        <Anchor className="btn-transparent" path="/collections">
          VIEW ALL
          <i className="feather feather-arrow-right" />
        </Anchor>
      </div>
      {renderedComponent}
    </div>
  );
};

export default NewestCollectionArea;
