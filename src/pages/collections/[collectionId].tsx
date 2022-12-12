import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import CollectionDetailsArea from '@containers/collection-details/collection-details.container';
import { useEffect } from 'react';
import {
  resetCollectionsNftFilters,
  resetSelectedCollectionStats,
  setSelectedCollection,
} from '../../features/collections/store/collections.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import { ICollection } from '../../types/ICollection';

type PropsType = {
  collection: ICollection;
};

const CollectionDetailsPage = ({ collection }: PropsType) => {
  const dispatch = useAppDispatch();

  const collectionExist = Object.entries(collection).length;

  useEffect(() => {
    if (collection.id) {
      dispatch(resetSelectedCollectionStats());
      dispatch(resetCollectionsNftFilters());
      dispatch(setSelectedCollection(collection));
    }
  }, [collection, collection.id, dispatch]);

  return (
    <>
      <SEO pageTitle={collectionExist ? `${collection.name} - Collections` : ''} />
      <Breadcrumb
        pageTitle={collectionExist ? `${collection.name} - Collections` : ''}
        currentPage="Collections"
      />
      <CollectionDetailsArea />
    </>
  );
};

type ParamsType = {
  params: { collectionId: string };
};

export async function getServerSideProps({ params }: ParamsType) {
  const url = `${process.env.NEXT_PUBLIC_LEDA_API_URL}/collections/${params.collectionId}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const collection = await res.json();

  return {
    props: {
      collection: res.status === 404 ? {} : collection,
    },
  };
}

export default CollectionDetailsPage;
