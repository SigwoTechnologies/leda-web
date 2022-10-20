import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header';
import Footer from '@layout/footer';
import Breadcrumb from '@components/breadcrumb';
import ProductDetailsArea from '@containers/product-details';
import ProductArea from '@containers/product/product-area';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAppSelector from '../../store/hooks/useAppSelector';
import { selectById } from '../../features/leda-nft/store/leda-nft.slice';
import { findById } from '../../features/leda-nft/store/leda-nft.actions';
import useAppDispatch from '../../store/hooks/useAppDispatch';

type Props = {
  itemId: string;
};

/* export async function getStaticProps() {
  return { props: { className: 'template-color-1' } };
} */

const ProductDetails = ({ itemId }: Props) => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => selectById(state, itemId));

  useEffect(() => {
    if (!item) {
      dispatch(findById(itemId));
    }
  }, [dispatch, itemId, item]);

  useEffect(() => {
    if (typeof window !== undefined) {
      document.body.classList.add('template-color-1');
    }
  }, []);

  return (
    <Wrapper>
      <SEO pageTitle="Product Details" />
      <Header />
      <main id="main-content">
        <Breadcrumb pageTitle="Product Details" currentPage="Product Details" />
        {item && (
          <>
            <ProductDetailsArea item={item} />
            <ProductArea sectionTitle="More from this seller" relatedProducts={[]} />
          </>
        )}
      </main>
      <Footer />
    </Wrapper>
  );
};

type Params = {
  params: { itemId: string };
};

export async function getServerSideProps({ params }: Params) {
  return {
    props: {
      itemId: params.itemId,
    },
  };
}

export default ProductDetails;
