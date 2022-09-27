import clsx from 'clsx';
import Sticky from '@ui/sticky';
import Button from '@ui/button';
import GalleryTab from '@components/product-details/gallery-tab';
import ProductTitle from '@components/product-details/title';
import ProductCategory from '@components/product-details/category';
import ProductCollection from '@components/product-details/collection';
import BidTab from '@components/product-details/bid-tab';
import PlaceBet from '@components/product-details/place-bet';
import { Product2 } from '@types';

type Props = {
  className?: string;
  space?: number;
  product: Product2;
};

const ProductDetailsArea = ({ space = 1, className, product }: Props) => (
  <div className={clsx('product-details-area', space === 1 && 'rn-section-gapTop', className)}>
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-7 col-md-12 col-sm-12">
          <Sticky>
            <GalleryTab images={product.images} />
          </Sticky>
        </div>
        <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
          <div className="rn-pd-content-area">
            <ProductTitle title={product.title} likeCount={product.likeCount} />
            <span className="bid">
              Height bid{' '}
              <span className="price">
                {product.price.amount}
                {product.price.currency}
              </span>
            </span>
            <h6 className="title-name">#22 Portal , Info bellow</h6>
            <div className="catagory-collection">
              <ProductCategory owner={product.owner} />
              <ProductCollection collection={product.collection} />
            </div>
            <Button color="primary-alta" path="#">
              Unlockable content included
            </Button>
            <div className="rn-bid-details">
              <BidTab
                owner={product.owner}
                properties={product?.properties}
                tags={product?.tags}
                history={product?.history}
              />
              <PlaceBet highestBid={product.highestBid} auctionDate={product?.auctionDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetailsArea;
