import { useState } from 'react';
import clsx from 'clsx';
import Sticky from '@ui/sticky';
import Button from '@ui/button';
import GalleryTab from '@components/product-details/gallery-tab';
import ProductTitle from '@components/product-details/title';
import { Item } from '@types';

type Props = {
  className?: string;
  space?: number;
  item: Item;
};

const ProductDetailsArea = ({ space = 1, className, item }: Props) => {
  const [selectedImg, setSelectedImg] = useState(item.image.url);

  const handleImageChange = (img: string) => {
    setSelectedImg(img);
  };

  return (
    <div className={clsx('product-details-area', space === 1 && 'rn-section-gapTop', className)}>
      <div className="container">
        <div className="row g-5">
          <div
            className="col-lg-7 col-md-12 col-sm-12"
            style={{ height: '100vh', position: 'sticky' }}
          >
            <Sticky>
              <div className="row">
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
              </div>
            </Sticky>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
            <div className="rn-pd-content-area">
              <ProductTitle title={item.name} likeCount={item.likes} />
              {/* <span className="bid">
              Height bid{' '}
              <span className="price">
                {item.price}
                {product.price.currency}
              </span>
            </span> */}
              <h6 className="title-name">{item.description}</h6>
              <div className="catagory-collection">
                {/* <ProductCategory owner={item.owner} />
              <ProductCollection collection={product.collection} /> */}
              </div>
              <Button color="primary-alta" path="#">
                Unlockable content included
              </Button>
              {/* <div className="rn-bid-details">
              <BidTab
                owner={product.owner}
                properties={product?.properties}
                tags={product?.tags}
                history={product?.history}
              />
              <PlaceBet highestBid={product.highestBid} auctionDate={product?.auctionDate} />
            </div> */}
            </div>
          </div>
        </div>
        <div>
          <h2>come</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsArea;
