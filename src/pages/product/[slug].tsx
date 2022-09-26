import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header';
import Footer from '@layout/footer';
import Breadcrumb from '@components/breadcrumb';
import ProductDetailsArea from '@containers/product-details';
import ProductArea from '@containers/product/product-area';
import { shuffleArray } from '@utils/methods';

// demo data
import productData from '../../data/products.json';
import { Product2 } from '../../types/product';

type Props = {
  product: Product2;
  relatedProducts: Product2[];
};

const ProductDetails = ({ product, relatedProducts }: Props) => (
  <Wrapper>
    <SEO pageTitle="Product Details" />
    <Header />
    <main id="main-content">
      <Breadcrumb pageTitle="Product Details" currentPage="Product Details" />
      <ProductDetailsArea product={product} />
      <ProductArea sectionTitle="More from this seller" relatedProducts={relatedProducts} />
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
  const product = productData.find(({ slug }) => slug === params.slug) as Product2;
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
