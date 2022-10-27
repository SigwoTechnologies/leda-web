import clsx from 'clsx';
import Sticky from '@ui/sticky';
import Button from '@ui/button';
import GalleryTab from '@components/item-details/gallery-tab';
import ProductTitle from '@components/item-details/title';
import { Item } from '@types';
import BidTab from '@components/item-details/bid-tab';
import PlaceBet from '@components/item-details/place-bet';
import Product from '@components/item';
import { selectAuthState } from '../../features/auth/store/auth.slice';
import useAppSelector from '../../store/hooks/useAppSelector';

type Props = {
  className?: string;
  space?: number;
  item: Item;
};

const ProductDetailsArea = ({ space = 1, className, item }: Props) => {
  const { address } = useAppSelector(selectAuthState);

  const isOwner: boolean = address === item?.owner.address;

  return (
    <div className={clsx('product-details-area', space === 1 && 'rn-section-gapTop', className)}>
      <div className="container">
        <div className="row g-5">
          <div
            className="col-lg-7 col-md-12 col-sm-12"
            style={{ height: '100vh', position: 'sticky' }}
          >
            <Sticky>
              <img
                src={`${
                  item.image.url
                }?img-width=${740}&img-height=${560}&img-fit=${'crop'}&img-quality=${85}`}
                alt="NFT_portfolio"
                style={{ borderRadius: '20px' }}
              />
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
              {isOwner && (
                <Button color="primary-alta" path={item?.image.url}>
                  Unlockable content included
                </Button>
              )}
              <div className="rn-bid-details">
                <BidTab />
                {!isOwner ?? <PlaceBet item={item} />}
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
