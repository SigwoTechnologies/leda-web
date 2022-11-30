import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import CollectionDetailsArea from '@containers/collection-details/collection-details.container';
import { useEffect, useMemo } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { findCollectionById } from '../../features/collections/store/collections.actions';
import {
  resetCollectionsNftFilters,
  selectCollectionsState,
} from '../../features/collections/store/collections.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';

type PropsType = {
  collectionId: string;
};

const NotFound = () => (
  <div className="notListedLayout">
    <h2>This collection does not exist. Please try with another one</h2>
    <h5>Thank you!</h5>
  </div>
);

const CollectionDetailsPage = ({ collectionId }: PropsType) => {
  const dispatch = useAppDispatch();
  const { isLoadingCollections, selectedCollection } = useAppSelector(selectCollectionsState);

  useEffect(() => {
    dispatch(findCollectionById(collectionId));
    dispatch(resetCollectionsNftFilters());
  }, [collectionId, dispatch]);

  const renderedComponent = useMemo(() => {
    if (Object.entries(selectedCollection.collection).length === 0 && !isLoadingCollections)
      return <NotFound />;
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
        <CollectionDetailsArea />
      </div>
    );
  }, [selectedCollection.collection, isLoadingCollections]);

  return (
    <>
      <SEO
        pageTitle={`${
          selectedCollection.collection.name ? `${selectedCollection.collection.name} -` : ''
        } Collections`}
      />
      <Breadcrumb
        pageTitle={`${
          selectedCollection.collection.name ? selectedCollection.collection.name : ''
        } - Collections`}
        currentPage="Collections"
      />
      {renderedComponent}
    </>
  );
};

type ParamsType = {
  params: { collectionId: string };
};

export async function getServerSideProps({ params }: ParamsType) {
  return {
    props: {
      collectionId: params.collectionId,
    },
  };
}

export default CollectionDetailsPage;
