import { NewestCollections } from '@components/collections/newest-collections';
import SEO from '@components/seo';
import Hero from '@containers/hero/hero';
import { NewestItem } from '@containers/item/newest-item';
import ServiceArea from '@containers/services';
import { normalizedData } from '@utils/methods';
import { useEffect } from 'react';
import homepageData from '../data/homepages/home-01.json';
import { getNewest as getNewestHero } from '../features/leda-nft/store/leda-nft.actions';
import { getNewest as getNewestMarket } from '../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../store/hooks/useAppDispatch';

const Home = () => {
  const dispatch = useAppDispatch();

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
      <NewestItem data={content?.['newest-section']} />
      <NewestCollections />
    </>
  );
};

export default Home;
