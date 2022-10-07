import { normalizedData } from '@utils/methods';
import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header';
import Footer from '@layout/footer';
import HeroArea from '@containers/hero';
import ServiceArea from '@containers/services';
import NewestItmesArea from '@containers/product/newest-item';
import { useEffect } from 'react';
import homepageData from '../data/homepages/home-01.json';
import useAppDispatch from '../store/hooks/useAppDispatch';
import { findAll } from '../features/leda-nft/store/leda-nft.actions';
import useAppSelector from '../store/hooks/useAppSelector';
import { selectItems2 } from '../features/leda-nft/store/leda-nft.slice';

export async function getStaticProps() {
  return { props: { className: 'template-color-1' } };
}

const Home = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems2);
  const content = normalizedData(homepageData?.content || []);

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);

  return (
    <Wrapper>
      <SEO pageTitle="Home Default" />
      <Header />
      <main id="main-content">
        <HeroArea homeSection={content?.['hero-section']} />
        <ServiceArea data={content?.['service-section']} />
        {items.length && <NewestItmesArea data={content?.['newest-section']} products={items} />}
      </main>
      <Footer />
    </Wrapper>
  );
};

export default Home;
