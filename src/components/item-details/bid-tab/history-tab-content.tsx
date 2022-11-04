import { History, Item } from '@types';
import Anchor from '@ui/anchor';
import { getTimeAgo } from '@utils/getTimeAgo';
import clsx from 'clsx';
import Image from 'next/image';
import useSWR from 'swr';
import { itemService } from '../../../features/leda-nft/services/item.service';

type Props = {
  item: Item;
};
const fetchHistory = async (itemId: string) =>
  itemService.findHistoryByItemId(itemId).then((data) => data.reverse());

export const HistoryTabContent = ({ item }: Props) => {
  const { data: history } = useSWR<History[]>(item.itemId, fetchHistory);

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
            {item.image?.url && (
              // We need a image profile
              <div className={clsx('thumbnail', 'verified')}>
                <Anchor path="path">
                  <Image
                    src="/images/icons/boy-avater.png"
                    alt="Nft_Profile"
                    width={50}
                    height={50}
                    layout="fixed"
                  />
                </Anchor>
              </div>
            )}
            <div className="top-seller-content">
              <span>
                <span className="text-white">{item.name}</span> was {e.transactionType}{' '}
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
