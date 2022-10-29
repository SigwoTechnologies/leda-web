import { useEffect, useState } from 'react';
import Breadcrumb from '@components/breadcrumb';
import ItemFilter from '@components/item-filter';
import ItemsArea from '@containers/explore-product';
import Link from 'next/link';
import SEO from '@components/seo';
import ClipLoader from 'react-spinners/ClipLoader';
import { selectNftState } from '../features/leda-nft/store/leda-nft.slice';
import { Item } from '../types/item';
import { findAll } from '../features/leda-nft/store/leda-nft.actions';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useAppSelector from '../store/hooks/useAppSelector';

const RenderItems = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector(selectNftState);
  const [nfts, setNfts] = useState<Item[]>([...items]);

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);

  if (isLoading)
    return (
      <div
        className="spinner-container"
        style={{ position: 'inherit', display: 'grid', placeContent: 'center', height: '100vh' }}
      >
        <div className="spinner-child">
          <ClipLoader className="spinner" color="#35b049" />
        </div>
      </div>
    );

  if (items.length) {
    return (
      <div className="container mt-4">
        {items.length > 1 && <ItemFilter setNfts={setNfts} />}
        <ItemsArea items={nfts} />
      </div>
    );
  }

  return (
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
  );
};

const Marketplace = () => (
  <>
    <SEO pageTitle="NFT Marketplace" />
    <Breadcrumb pageTitle="NFT Marketplace" currentPage="NFT Marketplace" />
    <RenderItems />
  </>
);

export default Marketplace;
