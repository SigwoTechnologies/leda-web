import { BidTab } from '@components/item-details/bid-tab/bid-tab';
import PlaceBet from '@components/item-details/place-bet';
import ProductTitle from '@components/item-details/title';
import { Item } from '@types';
import Button from '@ui/button';
import Sticky from '@ui/sticky';
import clsx from 'clsx';
import { selectAuthState } from '../../features/auth/store/auth.slice';
import ItemStatus from '../../features/marketplace/process/enums/item-status.enum';
import useAppSelector from '../../store/hooks/useAppSelector';

type Props = {
  className?: string;
  space?: number;
};

const ProductDetailsArea = ({ space = 1, className }: Props) => {
  const { address } = useAppSelector(selectAuthState);
  const { selectedItem } = useAppSelector((state) => state.marketplace);

  const isOwner = address === selectedItem?.owner.address;

  const isAuthor = address === selectedItem?.author?.address;

  const priceLabel = isOwner ? 'You own this NFT' : 'Buy it now for';

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
                  selectedItem.image.url
                }?img-width=${740}&img-height=${560}&img-fit=${'crop'}&img-quality=${85}`}
                alt="NFT_portfolio"
                style={{ borderRadius: '20px' }}
              />
            </Sticky>
          </div>

          <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
            <div className="rn-pd-content-area">
              <ProductTitle
                title={selectedItem.name}
                likeCount={selectedItem.likes}
                itemId={selectedItem.itemId.slice(0, 4)}
              />
              {isAuthor && (
                <h6 className="bid d-flex flex-row align-items-center gap-2 my-4">
                  You&apos;ve created an incredible NFT
                </h6>
              )}
              {selectedItem.price && ItemStatus.Listed ? (
                <p className="d-flex flex-row align-items-center gap-2">
                  {priceLabel}
                  {!isOwner && (
                    <span className="bid d-flex flex-row align-items-center gap-2">
                      {selectedItem.price}
                      <span className="price">ETH</span>
                    </span>
                  )}
                </p>
              ) : (
                <span className="bid d-flex flex-row align-items-center gap-2">
                  This NFT is not listed yet
                </span>
              )}
              <h6 className="title-name">{selectedItem.description}</h6>
              {isOwner && (
                <Button color="primary-alta" path={selectedItem.image.url}>
                  Download Item
                </Button>
              )}
              <div className="rn-bid-details">
                <BidTab />
                {!isOwner && selectedItem.status === ItemStatus.Listed && (
                  <PlaceBet item={selectedItem} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsArea;
