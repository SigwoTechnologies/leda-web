import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import { useEffect, useMemo } from 'react';
import Breadcrumb from '@components/breadcrumb';
import ItemFilter from '@components/item-filter';
import MarketplaceArea from '@containers/marketplace';
import NoSearchResults from '@containers/marketplace/no-search-results';
import SEO from '@components/seo';
import { selectNFTsMarketplace } from '../features/marketplace/store/marketplace.slice';
import { findFilteredItems } from '../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useAppSelector from '../store/hooks/useAppSelector';

const Marketplace = () => {
  const dispatch = useAppDispatch();
  const { marketplaceFilters, isLoading, itemPagination } = useAppSelector(selectNFTsMarketplace);

  useEffect(() => {
    dispatch(findFilteredItems(marketplaceFilters));
  }, [dispatch, marketplaceFilters]);

  const renderedComponent = useMemo(
    () => (itemPagination.items.length ? <MarketplaceArea /> : <NoSearchResults />),
    [itemPagination.items.length]
  );

  return (
    <>
      <SEO pageTitle="NFT Marketplace" />
      <Breadcrumb pageTitle="NFT Marketplace" currentPage="NFT Marketplace" />
      <div className="container mt-4">
        <ItemFilter />
        <SpinnerContainer isLoading={isLoading}>{renderedComponent}</SpinnerContainer>
      </div>
    </>
  );
};

export default Marketplace;
