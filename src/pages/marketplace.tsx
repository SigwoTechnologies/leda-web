import { useEffect, useMemo } from 'react';
import Breadcrumb from '@components/breadcrumb';
import ItemFilter from '@components/item-filter';
import ItemsArea from '@containers/explore-product';
import Link from 'next/link';
import SEO from '@components/seo';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useAppSelector from '../store/hooks/useAppSelector';
import { selectNFTsMarketplace } from '../features/marketplace/store/marketplace.slice';
import { findFilteredItems } from '../features/marketplace/store/marketplace.actions';

const NoSearchResults = () => (
  <div className="text-center my-5">
    <h2>No results found</h2>
    <h6>Try adjusting your search to find what you&apos;re looking for</h6>
    <h6 className="font-light" style={{ fontWeight: '400' }}>
      Do you want to become an NFT artist?
    </h6>
    <Link href="/create">
      <h5 className="text-center text-underline notNftsLink">
        <u>Visit our creation center!</u>
      </h5>
    </Link>
  </div>
);

const RenderItems = () => {
  const dispatch = useAppDispatch();
  const { marketplaceFilters, isLoading, itemPagination } = useAppSelector(selectNFTsMarketplace);

  useEffect(() => {
    dispatch(findFilteredItems(marketplaceFilters));
  }, [dispatch, marketplaceFilters]);

  const renderedComponent = useMemo(
    () => (itemPagination.items.length ? <ItemsArea /> : <NoSearchResults />),
    [itemPagination.items.length]
  );

  return <SpinnerContainer isLoading={isLoading}>{renderedComponent}</SpinnerContainer>;
};

const Marketplace = () => (
  <>
    <SEO pageTitle="NFT Marketplace" />
    <Breadcrumb pageTitle="NFT Marketplace" currentPage="NFT Marketplace" />
    <div className="container mt-4">
      <ItemFilter />
      <RenderItems />
    </div>
  </>
);

export default Marketplace;
