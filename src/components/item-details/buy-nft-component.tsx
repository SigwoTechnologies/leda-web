import ActionLoaderComponent from '@components/action-loader/action-loader.component';
import { BuyModal } from '@components/modals/buy-modal/buy-modal';
import { HighestBid } from '@types';
import Button from '@ui/button';
import clsx from 'clsx';
import { useState } from 'react';
import { setIsModalOpen } from '../../features/marketplace/store/marketplace.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';

type Props = {
  highestBid?: HighestBid;
  actionDate?: string;
  btnColor?: 'primary' | 'primary-alta';
  className?: string;
};

const BuyNftComponent = ({ highestBid, actionDate, btnColor, className }: Props) => {
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector((state) => state.marketplace);
  const { isLoading } = useAppSelector((state) => state.ledaNft);

  const handleBuyModal = () => {
    dispatch(setIsModalOpen(!isModalOpen));
  };

  return (
    <>
      <div className={clsx('place-bet-area', className)}>
        <ActionLoaderComponent
          isLoading={isLoading}
          onClick={handleBuyModal}
          buttonSize="medium"
          type="submit"
          buttonFullwidth
          label="Buy"
          labelLoading="Buying"
        />
      </div>
      <BuyModal handleModal={handleBuyModal} />
    </>
  );
};

export default BuyNftComponent;
