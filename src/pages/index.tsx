import SEO from '@components/seo';
import NewestCollectionsArea from '@containers/collections/newest-collections.container';
import Hero from '@containers/hero/hero';
import NewestItemsArea from '@containers/item/newest-item';
import ServiceArea from '@containers/services';
import { normalizedData } from '@utils/methods';
import { useEffect } from 'react';
import homepageData from '../data/homepages/home-01.json';
import { getNewest } from '../features/leda-nft/store/leda-nft.actions';
import { selectNewest } from '../features/leda-nft/store/leda-nft.slice';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useAppSelector from '../store/hooks/useAppSelector';

const Home = () => {
  const dispatch = useAppDispatch();
  const newItems = useAppSelector(selectNewest);
  const content = normalizedData(homepageData?.content || []);

  const qtyToFetch = 5;

  useEffect(() => {
    dispatch(getNewest(qtyToFetch));
  }, [dispatch]);

  return (
    <>
      <SEO pageTitle="Home" />
      <Hero />
      <ServiceArea data={content?.['service-section']} />
      <NewestItemsArea data={content?.['newest-section']} items={newItems} />
      <NewestCollectionsArea />
    </>
  );
};

export default Home;
