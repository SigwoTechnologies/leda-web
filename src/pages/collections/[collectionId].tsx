import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import CollectionDetailsArea from '@containers/collection-details/collection-details.container';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import { useEffect } from 'react';
import {
  findFilteredCollectionItems,
  findPriceRange,
} from '../../features/collections/store/collections.actions';
import {
  resetCollectionsNftFilters,
  resetSelectedCollectionStats,
  setSelectedCollection,
} from '../../features/collections/store/collections.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { ICollection } from '../../types/ICollection';

type PropsType = {
  collection: ICollection;
};

const CollectionDetailsPage = ({ collection }: PropsType) => {
  const dispatch = useAppDispatch();
  const {
    selectedCollection,
    collectionItemsFiltering: { itemsFilters, itemsPagination },
  } = useAppSelector((state) => state.collections);

  const collectionExist = Object.entries(collection).length;

  useEffect(() => {
    if (collection.id !== selectedCollection.id) {
      dispatch(resetSelectedCollectionStats());
      dispatch(resetCollectionsNftFilters());
      dispatch(setSelectedCollection(collection));
      dispatch(
        findFilteredCollectionItems({
          collectionId: collection.id,
          filters: itemsFilters,
        })
      );

      const itemsWithPrice = itemsPagination.items.filter((item) => item.price !== null);
      if (itemsWithPrice.length && itemsPagination.totalCount) {
        dispatch(findPriceRange(collection.id));
      }
    }
  }, [
    collection,
    collection.id,
    dispatch,
    itemsFilters,
    itemsPagination.items,
    itemsPagination.totalCount,
    selectedCollection.id,
  ]);

  return (
    <>
      <SEO pageTitle={collectionExist ? `${collection.name} - Collections` : ''} />
      <Breadcrumb
        pageTitle={collectionExist ? `${collection.name} - Collections` : ''}
        currentPage="Collections"
      />

      <SpinnerContainer isLoading={collection.id !== selectedCollection.id}>
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
