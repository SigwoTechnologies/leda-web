import { useEffect } from 'react';
import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header';
import Footer from '@layout/footer';
import Breadcrumb from '@components/breadcrumb';
import ItemsArea from '@containers/explore-product';
import ItemFilter from '@components/item-filter';
import useAppDispatch from '../store/hooks/useAppDispatch';
import { findAll } from '../features/leda-nft/store/leda-nft.actions';
import useAppSelector from '../store/hooks/useAppSelector';
import { selectState } from '../features/leda-nft/store/leda-nft.slice';

export async function getStaticProps() {
  return { props: { className: 'template-color-1' } };
}

const Product = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectState);

  useEffect(() => {
    dispatch(findAll()); // TODO: Paginate this fetch
  }, [dispatch]);

  return (
    <Wrapper>
      <SEO pageTitle="Marketplace" />
      <Header />
      <main id="main-content">
        <Breadcrumb pageTitle="Marketplace" currentPage="Marketplace" />
        <div className="container">
          <ItemFilter />
        </div>
        <ItemsArea items={items} />
      </main>
      <Footer />
    </Wrapper>
  );
};

export default Product;
