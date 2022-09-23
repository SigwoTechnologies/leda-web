import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header';
import Footer from '@layout/footer';
import HeroArea from '@containers/hero/layout-01';
import ServiceArea from '@containers/services';
import NewestItmesArea from '@containers/product/layout-04';
import { normalizedData } from '@utils/methods';

// Demo Data
import homepageData from '../data/homepages/home-01.json';
import productData from '../data/products.json';

export async function getStaticProps() {
  return { props: { className: 'template-color-1' } };
}

const Home = () => {
  const content = normalizedData(homepageData?.content || []);
  const newestData = productData
    .sort((a, b) => Number(new Date(b.published_at)) - Number(new Date(a.published_at)))
    .slice(0, 5);

  return (
    <Wrapper>
      <SEO pageTitle="Home Default" />
      <Header />
      <main id="main-content">
        <HeroArea data={content?.['hero-section']} />
        <ServiceArea data={content?.['service-section']} />
        <NewestItmesArea
          data={{
            ...(content?.['newest-section'] || {}),
            products: newestData,
          }}
        />
      </main>
      <Footer />
    </Wrapper>
  );
};

export default Home;
