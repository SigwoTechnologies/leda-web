import { BidTab } from '@components/item-details/bid-tab/bid-tab';
import { BuyNft } from '@components/item-details/buy-nft';
import ProductTitle from '@components/item-details/title';
import Button from '@ui/button';
import Sticky from '@ui/sticky';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';
import useAppSelector from '@store/hooks/useAppSelector';
import { selectUiReducer } from '@store/ui/ui.slice';
import appConfig from '../../common/configuration/app.config';
import ItemStatus from '../../common/minting/enums/item-status.enum';
import { selectAuthState } from '../../features/auth/store/auth.slice';
import { selectCanISeeItem } from '../../features/marketplace/store/marketplace.slice';

const HiddenLayout = () => (
  <div className="notListedLayout">
    <h2>It seems like this item does not exist or it is hidden.</h2>
    <h4>If you are the owner and you can not see it, please contact us to fix your problem.</h4>
    <h5>Thank you!</h5>
    <span style={{ fontStyle: 'italic' }}>LEDA Team</span>
  </div>
);

const RenderedItem = () => {
  const { address } = useAppSelector(selectAuthState);
  const { selectedItem } = useAppSelector((state) => state.marketplace);
  const { isNetworkAdviceOpen } = useAppSelector(selectUiReducer);

  const isOwner = address === selectedItem?.owner?.address;

  const isAuthor = address === selectedItem?.author?.address;

  const stickyPadding = useMemo(
    () => (isNetworkAdviceOpen ? '150px' : '100px'),
    [isNetworkAdviceOpen]
  );

  const priceLabel = isOwner ? 'You own this NFT for' : 'Buy it now for';

  return (
    <div className={clsx('product-details-area rn-section-gapTop')}>
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-7 col-md-12 col-sm-12 item-image">
            <Sticky top={stickyPadding}>
              {selectedItem.isLazy && (
                <div className="ribbon-details ribbon-top-left-details">
                  <span>Lazy</span>
                </div>
              )}
              <img
                src={`${appConfig.imageUrl}${
                  selectedItem.image?.url
                }?img-width=${740}&img-height=${560}&img-fit=${'crop'}&img-quality=${85}`}
                alt={`${selectedItem.name} NFT. LEDA - NFT Marketplace. ${selectedItem.owner?.address} at LEDA`}
                style={{
                  borderRadius: '20px',
                }}
              />
            </Sticky>
          </div>

          <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
            <div className="rn-pd-content-area">
              <ProductTitle />
              <Link href={`/collections/${selectedItem.collection?.id}`}>
                <span className="mt-3 collections-link">
                  <u>View NFT&apos;s Collection</u>
                </span>
              </Link>

              {isAuthor && (
                <h6 className="bid d-flex flex-row align-items-center gap-2 my-4">
                  You&apos;ve created an incredible NFT
                </h6>
              )}

              {selectedItem.status === ItemStatus.Listed ? (
                <p className="d-flex flex-row align-items-center gap-2">
                  {priceLabel}
                  {Number(selectedItem.price) ? (
                    <span className="bid d-flex flex-row align-items-center gap-2">
                      {selectedItem.price}
                      <span className="price">ETH</span>
                    </span>
                  ) : (
                    <span className="bid" style={{ fontSize: '16px' }}>
                      <span className="price">free</span>
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
                <Button
                  color="primary-alta"
                  path={`${appConfig.imageUrl}${selectedItem.image.url}`}
                  style={{ borderRadius: '5px' }}
                >
                  Download Item
                </Button>
              )}
              <div className="rn-bid-details">
                <BidTab />
                &nbsp;
                {!isOwner && selectedItem.status === ItemStatus.Listed && <BuyNft />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductDetailsArea = () => {
  const { selectedItem } = useAppSelector((state) => state.marketplace);

  const isVisible = useAppSelector(selectCanISeeItem);

  if (!isVisible) {
    return <HiddenLayout />;
  }

  if (Object.entries(selectedItem).length) {
    return <RenderedItem />;
  }

  return null;
};
