import { useEffect, useState } from 'react';
import Breadcrumb from '@components/breadcrumb';
import ItemFilter from '@components/item-filter';
import ItemsArea from '@containers/explore-product';
import Link from 'next/link';
import SEO from '@components/seo';
import { selectNftState } from '../features/leda-nft/store/leda-nft.slice';
import { Item } from '../types/item';
import { findAll } from '../features/leda-nft/store/leda-nft.actions';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useAppSelector from '../store/hooks/useAppSelector';

const Marketplace = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectNftState);
  const [nfts, setNfts] = useState<Item[]>([...items]);

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);

  return (
    <>
      <SEO pageTitle="Marketplace" />

      <Breadcrumb pageTitle="Marketplace" currentPage="Marketplace" />
      {items.length ? (
        <>
          <div className="container mt-4">
            <ItemFilter setNfts={setNfts} />
          </div>
          <ItemsArea items={nfts} />
        </>
      ) : (
        <div className="text-center my-5">
          <h1>No results found</h1>
          <h5>Try adjusting your search or filter to find what you&apos;re looking for</h5>
          <h5 className="font-light" style={{ fontWeight: '400' }}>
            Do you want to become an NFT artist?
          </h5>
          <Link href="/create">
            <h2 className="text-center text-underline notNftsLink">
              <u>Visit our creation center!</u>
            </h2>
          </Link>
        </div>
      )}
    </>
  );
};

export default Marketplace;
