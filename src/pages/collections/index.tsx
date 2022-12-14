import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import CollectionsArea from '@containers/collections/collections.container';
import { useEffect } from 'react';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { findFilteredCollections } from '../../features/collections/store/collections.actions';
import { resetFilters } from '../../features/marketplace/store/marketplace.slice';

const CollectionsPage = () => {
  const dispatch = useAppDispatch();
  const { collectionsFilters } = useAppSelector((state) => state.marketplace);

  useEffect(() => {
    dispatch(resetFilters());
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
