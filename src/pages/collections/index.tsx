import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import CollectionsArea from '@containers/collections/collections.container';
import { useEffect, useMemo } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  findAllCollections,
  findFilteredCollections,
} from '../../features/collections/store/collections.actions';
import {
  resetCollectionsFilters,
  selectCollectionsState,
} from '../../features/collections/store/collections.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';

const NotFound = () => (
  <div className="notListedLayout">
    <h2>We don&apos;t have collections to show. Please try again later.</h2>
    <h5>Thank you!</h5>
  </div>
);

const CollectionsPage = () => {
  const dispatch = useAppDispatch();
  const { isLoadingCollections, collections, collectionsFilters, collectionPagination } =
    useAppSelector(selectCollectionsState);

  useEffect(() => {
    dispatch(findAllCollections());
    dispatch(resetCollectionsFilters());
  }, [dispatch]);

  useEffect(() => {
    dispatch(findFilteredCollections(collectionsFilters));
  }, [dispatch, collectionsFilters]);

  const renderedComponent = useMemo(() => {
    if (collectionPagination.collections.length === 0 && !isLoadingCollections) return <NotFound />;
    if (isLoadingCollections)
      return (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: '100vh' }}
        >
          <ClipLoader className="spinner" color="#35b049" />
        </div>
      );
    return (
      <div>
        <CollectionsArea />
      </div>
    );
  }, [collectionPagination.collections.length, isLoadingCollections]);

  return (
    <>
      <SEO pageTitle="NFT Collections" />
      <Breadcrumb pageTitle="NFT Collections" currentPage="NFT Collections" />
      {renderedComponent}
    </>
  );
};

export default CollectionsPage;
