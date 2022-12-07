import { normalizedData } from '@utils/methods';
import { useEffect } from 'react';
import Hero from '@containers/hero/hero';
import NewestItemsArea from '@containers/item/newest-item';
import NewestCollectionsArea from '@containers/collections/newest-collections.container';
import SEO from '@components/seo';
import ServiceArea from '@containers/services';
import homepageData from '../data/homepages/home-01.json';
import { selectNewest } from '../features/leda-nft/store/leda-nft.slice';
import { findAll } from '../features/leda-nft/store/leda-nft.actions';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useAppSelector from '../store/hooks/useAppSelector';

const Home = () => {
  const dispatch = useAppDispatch();
  const newItems = useAppSelector(selectNewest);
  const content = normalizedData(homepageData?.content || []);

  useEffect(() => {
    dispatch(findAll());
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
