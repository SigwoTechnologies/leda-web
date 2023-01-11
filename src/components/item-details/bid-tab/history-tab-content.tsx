import Anchor from '@ui/anchor';
import { getTimeAgo } from '@utils/getTimeAgo';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { TransactionType } from '../../../common/enums/transaction-types.enum';
import { findHistoryByItemId } from '../../../features/marketplace/store/marketplace.actions';
import appConfig from '../../../common/configuration/app.config';

dayjs.extend(utc);

export const HistoryTabContent = () => {
  const dispatch = useAppDispatch();
  const { selectedItem, isLoadingHistory } = useAppSelector((state) => state.marketplace);

  useEffect(() => {
    if (selectedItem.itemId) {
      dispatch(findHistoryByItemId({ itemId: selectedItem.itemId }));
    }
  }, [dispatch, selectedItem.itemId]);

  if (!selectedItem.history?.length) {
    return (
      <div className="text-center my-5">
        <h3>No history found</h3>
      </div>
    );
  }

  if (isLoadingHistory) {
    return (
      <div className="text-center my-5">
        <ClipLoader className="spinner" color="#35b049" />
      </div>
    );
  }

  const imageURL = `${appConfig.imageUrl}${selectedItem.image?.url}?img-width=50&img-heigth=50`;

  return (
    <div>
      {selectedItem.history.map((e) => (
        <div className="top-seller-inner-one" key={e.id}>
          <div className="top-seller-wrapper">
            <div className={clsx('thumbnail', 'verified')}>
              <Anchor path="#">
                <Image src={imageURL} alt="Nft_Profile" width={50} height={50} />
              </Anchor>
            </div>
            <div className="top-seller-content">
              <span>
                <span className="item-history">
                  {selectedItem.name} - #{e.item.itemId?.slice(0, 4)}
                </span>
                &nbsp;was {e.transactionType} {e.price && <>for {e.price} ETH</>}
                {e.transactionType === TransactionType.Sold ? ' to ' : ' by '}
                <span className="item-history">{e.owner.address}</span>
              </span>

              <div className="time data">
                <i className="feather-clock" /> &nbsp;
                <span>{getTimeAgo(e.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
