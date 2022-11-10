import Anchor from '@ui/anchor';
import { getTimeAgo } from '@utils/getTimeAgo';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect } from 'react';
import { findHistoryByItemId } from '../../../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';

export const HistoryTabContent = () => {
  const dispatch = useAppDispatch();
  const { selectedItem } = useAppSelector((state) => state.marketplace);

  useEffect(() => {
    dispatch(findHistoryByItemId({ itemId: selectedItem.itemId }));
  }, [dispatch, selectedItem.itemId]);

  if (!selectedItem.history?.length) {
    return (
      <div className="text-center my-5">
        <h3>No history found</h3>
      </div>
    );
  }

  return (
    <div>
      {selectedItem.history?.map((e) => (
        <div className="top-seller-inner-one" key={e.id}>
          <div className="top-seller-wrapper">
            <div className={clsx('thumbnail', 'verified')}>
              <Anchor path="path">
                <Image src={selectedItem.image?.url} alt="Nft_Profile" width={50} height={50} />
              </Anchor>
            </div>
            <div className="top-seller-content">
              <span>
                <span className="text-white">{selectedItem.name}</span> was {e.transactionType}{' '}
                {e.price && <>price for {e.price} ETH</>} by{' '}
                <Anchor path="path">{e.owner.address}</Anchor>
              </span>

              <div className="time data">
                <i className="feather-clock" /> &nbsp;
                {getTimeAgo(e.createdAt)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
