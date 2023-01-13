import { CollectionCard } from '@components/collections/collection-card';
import Anchor from '@ui/anchor';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import { useEffect, useMemo } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { getNewestCollections } from '@features/marketplace/store/collections.actions';
import { ICollection } from '../../types/ICollection';

const NotFound = () => (
  <div className="">
    <h5 className="text-center">No collections to show</h5>
  </div>
);

export const NewestCollections = () => {
  const dispatch = useAppDispatch();
  const { newestCollections, isLoadingCollections } = useAppSelector((state) => state.marketplace);

  const qtyItemsToFetch = 4;

  useEffect(() => {
    dispatch(getNewestCollections(qtyItemsToFetch));
  }, [dispatch]);

  const renderedComponent = useMemo(() => {
    if (newestCollections.length === 0 && !isLoadingCollections) return <NotFound />;
    if (isLoadingCollections)
      return (
        <div className="d-flex align-items-center justify-content-center">
          <ClipLoader className="spinner" color="#35b049" />
        </div>
      );
    return (
      <div className="row g-5">
        {newestCollections.map((collection: ICollection) => (
          <div className="col-lg-3 col-md-6 col-sm-12" key={collection.id}>
            <CollectionCard collection={collection} />
          </div>
        ))}
      </div>
    );
  }, [newestCollections, isLoadingCollections]);

  return (
    <div
      className="container mt-5"
      data-sal-delay="150"
      data-sal="slide-up"
      data-sal-duration="800"
    >
      {newestCollections.length > 0 && (
        <>
          <div className="d-flex justify-content-between">
            <h3>Newest Collections</h3>
            <div
              className="view-more-btn text-start text-sm-end"
              data-sal-delay="150"
              data-sal="slide-up"
              data-sal-duration="800"
            >
              <Anchor
                className="btn-transparent d-flex align-items-center justify-content-end"
                path="/collections"
              >
                VIEW ALL
                <i className="feather feather-arrow-right" />
              </Anchor>
            </div>
          </div>
          <SpinnerContainer isLoading={isLoadingCollections}>{renderedComponent}</SpinnerContainer>
        </>
      )}
    </div>
  );
};
