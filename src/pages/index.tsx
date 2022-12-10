import SEO from '@components/seo';
import NewestCollectionsArea from '@containers/collections/newest-collections.container';
import Hero from '@containers/hero/hero';
import NewestItemsArea from '@containers/item/newest-item';
import ServiceArea from '@containers/services';
import { normalizedData } from '@utils/methods';
import { useEffect } from 'react';
import homepageData from '../data/homepages/home-01.json';
import { getNewest as getNewestHero } from '../features/leda-nft/store/leda-nft.actions';
import { getNewest as getNewestMarket } from '../features/marketplace/store/marketplace.actions';
import { selectMarketplaceState } from '../features/marketplace/store/marketplace.slice';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useAppSelector from '../store/hooks/useAppSelector';

const Home = () => {
  const dispatch = useAppDispatch();
  const { newestItems } = useAppSelector(selectMarketplaceState);
  const content = normalizedData(homepageData?.content || []);

  const qtyToFetchHero = 2;
  const qtyToFetchMarket = 5;

  useEffect(() => {
    dispatch(getNewestHero(qtyToFetchHero));
    dispatch(getNewestMarket(qtyToFetchMarket));
  }, [dispatch]);

  return (
    <>
      <SEO pageTitle="Home" />
      <Hero />
      <ServiceArea data={content?.['service-section']} />
      <NewestItemsArea data={content?.['newest-section']} items={newestItems} />
      <NewestCollectionsArea />
    </>
  );
};

export default Home;
