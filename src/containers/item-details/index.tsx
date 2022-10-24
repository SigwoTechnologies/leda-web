import { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import Sticky from '@ui/sticky';
import Button from '@ui/button';
import GalleryTab from '@components/item-details/gallery-tab';
import ProductTitle from '@components/item-details/title';
import { Item } from '@types';
import BidTab from '@components/item-details/bid-tab';
import PlaceBet from '@components/item-details/place-bet';
import Image from 'next/image';
import Product from '@components/item';
import { useRouter } from 'next/router';
import { selectAuthData } from '../../features/leda-nft/store/leda-nft.slice';
import useAppSelector from '../../store/hooks/useAppSelector';

type Props = {
  className?: string;
  space?: number;
  item: Item;
};

const ProductDetailsArea = ({ space = 1, className, item }: Props) => {
  const { query } = useRouter();
  const { itemId } = query;
  const { ethAddress } = useAppSelector(selectAuthData);
  // http://localhost:3333/v1/items/<id>

  const [selectedImg, setSelectedImg] = useState(item.image.url);
  const [itemOwnerAddress, setItemOwnerAddress] = useState('');
  const [itemPinataUrl, setItemPinataUrl] = useState('');

  /* const handleImageChange = (img: string) => {}; */

  /* const handleGetItemById = async (id: string) => {
    const res = await axios.get(`http://localhost:3333/v1/items/${id}`);
    setItemOwnerAddress(res.data.owner.address);
    setItemPinataUrl(res.data.image.url);
  }; */

  useEffect(() => {
    (async () => {
      const res = await axios.get(`http://localhost:3333/v1/items/${itemId}`);
      setItemOwnerAddress(res.data.owner.address);
      setItemPinataUrl(res.data.image.url);
    })();
  }, [itemId]);

  return (
    <div className={clsx('product-details-area', space === 1 && 'rn-section-gapTop', className)}>
      <div className="container">
        <div className="row g-5">
          <div
            className="col-lg-7 col-md-12 col-sm-12"
            style={{ height: '100vh', position: 'sticky' }}
          >
            {/* <a href={itemPinataUrl}>click image</a> */}
            <Sticky>
              {/* <div className="row">
                <div className="col-2 flex-column d-flex justify-content-between">
                  <button
                    onClick={() => handleImageChange(item.image.url)}
                    onKeyDown={() => handleImageChange(item.image.url)}
                    className={`${selectedImg === item.image.url ? 'border' : ''}`}
                    type="button"
                  >
                    <GalleryTab imageUrl={item.image.url} />
                  </button>
                  <button
                    onClick={() => handleImageChange(item.image.url)}
                    onKeyDown={() => handleImageChange(item.image.url)}
                    className={`${selectedImg === item.image.url ? 'border' : ''}`}
                    type="button"
                  >
                    <GalleryTab imageUrl={item.image.url} />
                  </button>
                  <button
                    onClick={() => handleImageChange(item.image.url)}
                    onKeyDown={() => handleImageChange(item.image.url)}
                    className={`${selectedImg === item.image.url ? 'border' : ''}`}
                    type="button"
                  >
                    <GalleryTab imageUrl={item.image.url} />
                  </button>
                </div>
                <div className="col-10">
                  <GalleryTab imageUrl={selectedImg} />
                </div>
              </div> */}
              <GalleryTab imageUrl={selectedImg} NFTName={item.name} />
            </Sticky>
          </div>

          <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
            <div className="rn-pd-content-area">
              <ProductTitle title={item.name} likeCount={item.likes} itemId={286} />
              Buy it now for{' '}
              <span className="bid">
                {item.price}
                <span className="price">{/* {product.price.currency} */} ETH</span>
              </span>
              <h6 className="title-name">{item.description}</h6>
              <div className="catagory-collection">
                {/* <ProductCategory owner={item.owner} />
                <ProductCollection collection={product.collection} /> */}
              </div>
              {itemOwnerAddress === ethAddress ? (
                <Button color="primary-alta" path="#">
                  Unlockable content included
                </Button>
              ) : null}
              <div className="rn-bid-details">
                <BidTab />
                <PlaceBet item={item} />
              </div>
            </div>
          </div>
        </div>
        <div className="" style={{ marginTop: '80px' }}>
          <h2>Recent View</h2>
          <div className="row g-5 d-flex">
            <div className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <Product
                overlay
                title={item.name}
                itemId={item.itemId}
                tokenId={item.tokenId}
                latestBid=""
                likeCount={item.likes}
                imageString={item.image.url}
              />
            </div>
            <div className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <Product
                overlay
                title={item.name}
                itemId={item.itemId}
                tokenId={item.tokenId}
                latestBid=""
                likeCount={item.likes}
                imageString={item.image.url}
              />
            </div>
            <div className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <Product
                overlay
                title={item.name}
                itemId={item.itemId}
                tokenId={item.tokenId}
                latestBid=""
                likeCount={item.likes}
                imageString={item.image.url}
              />
            </div>
            <div className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <Product
                overlay
                title={item.name}
                itemId={item.itemId}
                tokenId={item.tokenId}
                latestBid=""
                likeCount={item.likes}
                imageString={item.image.url}
              />
            </div>
            <div className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <Product
                overlay
                title={item.name}
                itemId={item.itemId}
                tokenId={item.tokenId}
                latestBid=""
                likeCount={item.likes}
                imageString={item.image.url}
              />
            </div>
          </div>
        </div>
        <div className="" style={{ marginTop: '90px' }}>
          <h2>Related Item</h2>
          <div className="row g-5 d-flex">
            <div className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <Product
                overlay
                title={item.name}
                itemId={item.itemId}
                tokenId={item.tokenId}
                latestBid=""
                likeCount={item.likes}
                imageString={item.image.url}
              />
            </div>
            <div className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <Product
                overlay
                title={item.name}
                itemId={item.itemId}
                tokenId={item.tokenId}
                latestBid=""
                likeCount={item.likes}
                imageString={item.image.url}
              />
            </div>
            <div className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <Product
                overlay
                title={item.name}
                itemId={item.itemId}
                tokenId={item.tokenId}
                latestBid=""
                likeCount={item.likes}
                imageString={item.image.url}
              />
            </div>
            <div className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <Product
                overlay
                title={item.name}
                itemId={item.itemId}
                tokenId={item.tokenId}
                latestBid=""
                likeCount={item.likes}
                imageString={item.image.url}
              />
            </div>
            <div className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <Product
                overlay
                title={item.name}
                itemId={item.itemId}
                tokenId={item.tokenId}
                latestBid=""
                likeCount={item.likes}
                imageString={item.image.url}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsArea;
