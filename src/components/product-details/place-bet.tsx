import { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Anchor from '@ui/anchor';
import Button from '@ui/button';
import PlaceBidModal from '@components/modals/placebid-modal';
import Countdown from '@ui/countdown/count-down';
import { ImageType } from '@utils/types';

// TODO: Type props and any types
const PlaceBet = ({ highestBid, auctionDate, btnColor, className }: any) => {
  const [showBidModal, setShowBidModal] = useState(false);
  const handleBidModal = () => {
    setShowBidModal((prev) => !prev);
  };
  return (
    <>
      <div className={clsx('place-bet-area', className)}>
        <div className="rn-bet-create">
          <div className="bid-list winning-bid">
            <h6 className="title">Winning bit</h6>
            <div className="top-seller-inner-one">
              <div className="top-seller-wrapper">
                {highestBid?.bidder?.image?.src && (
                  <div className="thumbnail">
                    <Anchor path={highestBid?.bidder?.slug}>
                      <Image
                        src={highestBid?.bidder.image.src}
                        alt="Nft_Profile"
                        width={44}
                        height={44}
                        layout="fixed"
                      />
                    </Anchor>
                  </div>
                )}

                <div className="top-seller-content">
                  <span className="heighest-bid">
                    Heighest bid{' '}
                    <Anchor path={highestBid?.bidder.slug}>{highestBid?.bidder.name}</Anchor>
                  </span>
                  <span className="count-number">{highestBid?.amount}</span>
                </div>
              </div>
            </div>
          </div>
          {auctionDate && (
            <div className="bid-list left-bid">
              <h6 className="title">Auction has ended</h6>
              <Countdown className="mt--15" date={auctionDate} />
            </div>
          )}
        </div>
        <Button color={btnColor || 'primary-alta'} className="mt--30" onClick={handleBidModal}>
          Place a Bid
        </Button>
      </div>
      <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
    </>
  );
};

PlaceBet.propTypes = {
  highestBid: PropTypes.shape({
    amount: PropTypes.string,
    bidder: PropTypes.shape({
      name: PropTypes.string,
      image: ImageType,
      slug: PropTypes.string,
    }),
  }),
  auctionDate: PropTypes.string,
  btnColor: PropTypes.string,
  className: PropTypes.string,
};

export default PlaceBet;
