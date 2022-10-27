import { useEffect, useState } from 'react';
import Breadcrumb from '@components/breadcrumb';
import ItemFilter from '@components/item-filter';
import ItemsArea from '@containers/explore-product';
import SEO from '@components/seo';
import { selectState } from '../features/leda-nft/store/leda-nft.slice';
import { Item } from '../types/item';
import { findAll } from '../features/leda-nft/store/leda-nft.actions';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useAppSelector from '../store/hooks/useAppSelector';

const Marketplace = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectState);
  const [nfts, setNfts] = useState<Item[]>([...items]);

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);

  return (
    <>
      <SEO pageTitle="Marketplace" />

      <Breadcrumb pageTitle="Marketplace" currentPage="Marketplace" />
      {items.length > 0 ? (
        <>
          <div className="container mt-4">
            <ItemFilter setNfts={setNfts} />
          </div>
          <ItemsArea items={nfts} />
        </>
      ) : (
        <h2>No items</h2>
      )}
    </>
  );
};

export default Marketplace;
