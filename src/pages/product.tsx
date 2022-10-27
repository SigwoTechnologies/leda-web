import { useEffect } from 'react';
import Breadcrumb from '@components/breadcrumb';
import ProductArea from '@containers/explore-product';
import SEO from '@components/seo';
import { selectState } from '../features/leda-nft/store/leda-nft.slice';
import { findAll } from '../features/leda-nft/store/leda-nft.actions';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useAppSelector from '../store/hooks/useAppSelector';

const Item = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectState);

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);

  return (
    <>
      <SEO pageTitle="Marketplace" />
      <Breadcrumb pageTitle="Marketplace" currentPage="Marketplace" />
      <ProductArea items={items} />
    </>
  );
};

export default Item;
