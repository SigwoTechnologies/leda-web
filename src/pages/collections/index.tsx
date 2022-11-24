import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import CollectionsArea from '@containers/collections/collections.container';
import { useEffect, useMemo } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { findAllCollections } from '../../features/collections/store/collections.actions';
import { selectCollectionsState } from '../../features/collections/store/collections.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';

const NotFound = () => (
  <div className="notListedLayout">
    <h2>This collection does not exist. Please try with another one</h2>
    <h5>Thank you!</h5>
  </div>
);

const CollectionsPage = () => {
  const dispatch = useAppDispatch();
  const { isLoadingCollections, collections } = useAppSelector(selectCollectionsState);

  useEffect(() => {
    dispatch(findAllCollections());
  }, [dispatch]);

  const renderedComponent = useMemo(() => {
    if (collections.length === 0 && !isLoadingCollections) return <NotFound />;
    if (isLoadingCollections)
      return (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: '100vh' }}
        >
          <ClipLoader className="spinner" color="#35b049" />
        </div>
      );
    return <CollectionsArea />;
  }, [collections, isLoadingCollections]);

  return (
    <>
      <SEO pageTitle="NFTs Collections" />
      <Breadcrumb pageTitle="NFTs Collections" currentPage="NFTs Collections" />
      {renderedComponent}
    </>
  );
};

export default CollectionsPage;
