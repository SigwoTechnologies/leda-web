import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import CollectionsArea from '@containers/collections/collections.container';
import { useEffect } from 'react';
import { findFilteredCollections } from '../../features/collections/store/collections.actions';
import { resetCollectionsFilters } from '../../features/marketplace/store/marketplace.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';

const CollectionsPage = () => {
  const dispatch = useAppDispatch();
  const { collectionsFilters } = useAppSelector((state) => state.marketplace);

  useEffect(() => {
    dispatch(resetCollectionsFilters());
  }, [dispatch]);

  useEffect(() => {
    dispatch(findFilteredCollections(collectionsFilters));
  }, [dispatch, collectionsFilters]);

  return (
    <>
      <SEO pageTitle="NFT Collections" />
      <Breadcrumb pageTitle="NFT Collections" currentPage="NFT Collections" />
      <CollectionsArea />
    </>
  );
};

export default CollectionsPage;
