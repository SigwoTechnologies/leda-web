import ActionLoaderComponent from '@components/action-loader/action-loader.component';
import { BuyModal } from '@components/modals/buy-modal/buy-modal';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { withAuthProtection } from '../../features/auth/store/auth.actions';
import { setIsModalOpen } from '../../features/marketplace/store/marketplace.slice';

export const BuyNft = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector((state) => state.marketplace);
  const { isLoading } = useAppSelector((state) => state.ledaNft);

  const handleBuyModal = () => {
    dispatch(withAuthProtection(setIsModalOpen(!isModalOpen)));
  };

  return (
    <>
      <div className="place-bet-area">
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
