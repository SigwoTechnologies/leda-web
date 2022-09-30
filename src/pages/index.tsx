import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header';
import Footer from '@layout/footer';
import HeroArea from '@containers/hero';
import ServiceArea from '@containers/services';
import NewestItmesArea from '@containers/product/newest-item';
import { normalizedData } from '@utils/methods';

// Demo Data
import homepageData from '../data/homepages/home-01.json';
import productData from '../data/products.json';
import useMarketplace from '../features/marketplace/hooks/useMarketplace';
import useNFT from '../features/NFT/hooks/useNFT';

export async function getStaticProps() {
  return { props: { className: 'template-color-1' } };
}

const Home = () => {
  const content = normalizedData(homepageData?.content || []);
  const newestData = productData
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
    .slice(0, 5);

  useMarketplace();
  useNFT();

  return (
    <Wrapper>
      <SEO pageTitle="Home Default" />
      <Header />
      <main id="main-content">
        <HeroArea homeSection={content?.['hero-section']} />
        <ServiceArea data={content?.['service-section']} />
        <NewestItmesArea data={content?.['newest-section']} products={newestData} />
      </main>
      <Footer />
    </Wrapper>
  );
};

export default Home;
