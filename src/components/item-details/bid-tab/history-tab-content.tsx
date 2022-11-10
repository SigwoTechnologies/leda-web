import { Item } from '@types';
import Anchor from '@ui/anchor';
import { getTimeAgo } from '@utils/getTimeAgo';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect } from 'react';
import { TransactionType } from '../../../common/enums/transaction-types.enum';
import { findHistoryByItemId } from '../../../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';

type Props = {
  item: Item;
};

export const HistoryTabContent = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const {
    selectedItem: { history },
  } = useAppSelector((state) => state.marketplace);

  useEffect(() => {
    dispatch(findHistoryByItemId({ itemId: item.itemId }));
  }, [dispatch, item.itemId]);

  if (!history?.length) {
    return (
      <div className="text-center my-5">
        <h3>No history found</h3>
      </div>
    );
  }

  return (
    <div>
      {history?.map((e) => (
        <div className="top-seller-inner-one" key={e.id}>
          <div className="top-seller-wrapper">
            <div className={clsx('thumbnail', 'verified')}>
              <Anchor path="path">
                <Image src={item.image?.url} alt="Nft_Profile" width={50} height={50} />
              </Anchor>
            </div>
            <div className="top-seller-content">
              <span>
                <span className="text-white">
                  {item.name} - #{e.item.itemId?.slice(0, 4)}
                </span>{' '}
                was {e.transactionType} {e.price && <>for {e.price} ETH</>}
                {e.transactionType === TransactionType.Sold ? ' to' : ' by'}
                <Anchor path="#">{e.owner.address}</Anchor>
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
