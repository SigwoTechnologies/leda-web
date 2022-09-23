import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header/header-01';
import Footer from '@layout/footer/footer-01';
import Breadcrumb from '@components/breadcrumb';
import ProductDetailsArea from '@containers/product-details';
import ProductArea from '@containers/product/layout-03';
import { shuffleArray } from '@utils/methods';

// demo data
import productData from '../../data/products.json';

// TODO: Type props
const ProductDetails = ({ product, recentViewProducts, relatedProducts }: any) => (
  <Wrapper>
    <SEO pageTitle="Product Details" />
    <Header />
    <main id="main-content">
      <Breadcrumb pageTitle="Product Details" currentPage="Product Details" />
      <ProductDetailsArea product={product} />
      <ProductArea
        data={{
          section_title: { title: 'More from this seller' },
          products: relatedProducts,
        }}
      />
    </main>
    <Footer />
  </Wrapper>
);

export async function getStaticPaths() {
  return {
    paths: productData.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

// TODO: Type props
export async function getStaticProps({ params }: any) {
  // TODO: Type product
  const product = productData.find(({ slug }) => slug === params.slug) as any;
  const { categories } = product;
  const recentViewProducts = shuffleArray(productData).slice(0, 5);
  const relatedProducts = productData
    .filter((prod) => prod.categories?.some((r) => categories?.includes(r)))
    .slice(0, 5);
  return {
    props: {
      className: 'template-color-1',
      product,
      recentViewProducts,
      relatedProducts,
    }, // will be passed to the page component as props
  };
}

export default ProductDetails;
