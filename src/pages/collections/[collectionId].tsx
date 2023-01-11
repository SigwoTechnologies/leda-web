import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import CollectionDetailsArea from '@containers/collection-details/collection-details.container';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { findFilteredCollectionItems } from '../../features/collections/store/collections.actions';
import {
  resetFilters,
  setSelectedCollection,
} from '../../features/marketplace/store/marketplace.slice';
import { ICollection } from '../../types/ICollection';

type PropsType = {
  collection: ICollection;
};

const CollectionDetailsPage = ({ collection }: PropsType) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedCollection, filters } = useAppSelector((state) => state.marketplace);

  const collectionExist = Object.entries(collection).length;
  const collectionIsDifferent = collection.id !== selectedCollection.id;

  useEffect(() => {
    if (collectionIsDifferent) {
      dispatch(resetFilters());
      dispatch(setSelectedCollection(collection));
    }
    dispatch(
      findFilteredCollectionItems({
        collectionId: collection.id,
        filters,
      })
    );
  }, [collection, collectionIsDifferent, dispatch, filters]);

  useEffect(() => {
    const exitingFunction = () => dispatch(resetFilters());

    router.events.on('routeChangeStart', exitingFunction);

    return () => {
      router.events.off('routeChangeStart', exitingFunction);
    };
  }, [dispatch, router.events]);

  return (
    <>
      <SEO pageTitle={collectionExist ? `${collection.name} - Collections` : ''} />
      <Breadcrumb
        pageTitle={collectionExist ? `${collection.name} - Collections` : ''}
        currentPage="Collections"
      />

      <SpinnerContainer isLoading={collectionIsDifferent}>
        <CollectionDetailsArea />
      </SpinnerContainer>
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
