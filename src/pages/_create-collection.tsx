import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header/header-01';
import Footer from '@layout/footer/footer-01';

export async function getStaticProps() {
  return { props: { className: 'template-color-1' } };
}

const CreateCollection = () => (
  <Wrapper>
    <SEO pageTitle="Contact" />
    <Header />
    <main id="main-content" />
    <Footer />
  </Wrapper>
);

export default CreateCollection;
