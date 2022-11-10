import { BuyModal } from '@components/modals/buy-modal/buy-modal';
import { HighestBid, Item } from '@types';
import Button from '@ui/button';
import clsx from 'clsx';
import { useState } from 'react';

type Props = {
  highestBid?: HighestBid;
  actionDate?: string;
  btnColor?: 'primary' | 'primary-alta';
  className?: string;
  item: Item;
};

const PlaceBet = ({ highestBid, actionDate, btnColor, className, item }: Props) => {
  const [showBidModal, setShowBidModal] = useState(false);
  const handleBidModal = () => {
    setShowBidModal((prev) => !prev);
  };
  return (
    <>
      <div className={clsx('place-bet-area', className)}>
        <Button color={btnColor || 'primary-alta'} className="mt--30" onClick={handleBidModal}>
          Buy
        </Button>
      </div>
      <BuyModal show={showBidModal} handleModal={handleBidModal} />
    </>
  );
};

export default PlaceBet;
