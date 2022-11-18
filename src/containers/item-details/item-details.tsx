import { BidTab } from '@components/item-details/bid-tab/bid-tab';
import BuyNftComponent from '@components/item-details/buy-nft-component';
import ProductTitle from '@components/item-details/title';
import Button from '@ui/button';
import Sticky from '@ui/sticky';
import clsx from 'clsx';
import ClipLoader from 'react-spinners/ClipLoader';
import { selectAuthState } from '../../features/auth/store/auth.slice';
import ItemStatus from '../../features/marketplace/process/enums/item-status.enum';
import { selectCanISeeItem } from '../../features/marketplace/store/marketplace.slice';
import useAppSelector from '../../store/hooks/useAppSelector';

type Props = {
  className?: string;
  space?: number;
};

const NotListedLayout = () => (
  <div className="notListedLayout">
    <h2>It seems like this item does not exist or it&apos;s not listed any more.</h2>
    <h4>If you are the owner and you can not see it, please contact us to fix your problem.</h4>
    <h5>Thank you!</h5>
  </div>
);

export const ProductDetailsArea = ({ space = 1, className }: Props) => {
  const { address } = useAppSelector(selectAuthState);
  const { selectedItem, isSelectedLoading } = useAppSelector((state) => state.marketplace);
  const isVisible = useAppSelector(selectCanISeeItem);

  const isOwner = address === selectedItem?.owner?.address;

  const isAuthor = address === selectedItem?.author?.address;

  const priceLabel = isOwner ? 'You own this NFT' : 'Buy it now for';

  if (!isSelectedLoading) {
    return (
      <div className="spinner-container" style={{ height: '100vh' }}>
        <div className="spinner-child">
          <ClipLoader className="spinner" color="#35b049" />
        </div>
      </div>
    );
  }

  if (!isVisible) {
    return <NotListedLayout />;
  }

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
                alt={`${selectedItem.name} NFT. LEDA - NFT Marketplace. ${selectedItem.owner.address} at LEDA`}
                style={{ borderRadius: '20px' }}
              />
            </Sticky>
          </div>

          <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
            <div className="rn-pd-content-area">
              <ProductTitle
                title={selectedItem.name}
                likeCount={selectedItem.likes}
                itemId={selectedItem.itemId}
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
                &nbsp;
                {!isOwner && selectedItem.status === ItemStatus.Listed && <BuyNftComponent />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
