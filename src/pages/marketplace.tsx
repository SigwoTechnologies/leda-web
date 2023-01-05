import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import { useEffect, useMemo } from 'react';
import Breadcrumb from '@components/breadcrumb';
import ItemFilter from '@components/item-filter';
import { MarketplaceArea } from '@containers/marketplace/MarketplaceArea';
import NoSearchResults from '@containers/marketplace/no-search-results';
import SEO from '@components/seo';
import {
  resetMarketplaceFilters,
  selectNFTsMarketplace,
} from '../features/marketplace/store/marketplace.slice';
import {
  findFilteredItems,
  findPriceRange,
} from '../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useAppSelector from '../store/hooks/useAppSelector';

const Marketplace = () => {
  const dispatch = useAppDispatch();
  const { marketplaceFilters, isLoading, itemPagination } = useAppSelector(selectNFTsMarketplace);

  useEffect(() => {
    dispatch(resetMarketplaceFilters());
  }, [dispatch]);

  useEffect(() => {
    if (itemPagination.totalCount) {
      dispatch(findPriceRange());
    }
  }, [dispatch, itemPagination.totalCount]);

  useEffect(() => {
    dispatch(findFilteredItems(marketplaceFilters));
  }, [dispatch, marketplaceFilters]);

  const [priceFrom, priceTo] = useMemo(() => {
    if (marketplaceFilters.cheapest >= 0 && marketplaceFilters.mostExpensive >= 0) {
      return [marketplaceFilters.cheapest, marketplaceFilters.mostExpensive];
    }
    return [-1, -1];
  }, [marketplaceFilters.cheapest, marketplaceFilters.mostExpensive]);

  const renderedComponent = useMemo(() => {
    if (itemPagination.items.length) return <MarketplaceArea />;

    if (!isLoading) return <NoSearchResults />;

    return null;
  }, [itemPagination.items.length, isLoading]);

  return (
    <>
      <SEO pageTitle="NFT Marketplace" />
      <Breadcrumb pageTitle="NFT Marketplace" currentPage="NFT Marketplace" />
      <div className="container mt-4" style={{ minHeight: '100vh' }}>
        <ItemFilter cheapest={+priceFrom} mostExpensive={+priceTo} />
        <SpinnerContainer isLoading={isLoading}>{renderedComponent}</SpinnerContainer>
      </div>
    </>
  );
};

export default Marketplace;
