import { BidTab } from '@components/item-details/bid-tab/bid-tab';
import PlaceBet from '@components/item-details/place-bet';
import ProductTitle from '@components/item-details/title';
import { Item } from '@types';
import Button from '@ui/button';
import Sticky from '@ui/sticky';
import clsx from 'clsx';
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
                <span className="price">ETH</span>
              </span>
              <h6 className="title-name">{item.description}</h6>
              {isOwner && (
                <Button color="primary-alta" path={item?.image.url}>
                  Download High Resolution Image
                </Button>
              )}
              <div className="rn-bid-details">
                <BidTab item={item} />
                {!isOwner && <PlaceBet item={item} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsArea;
