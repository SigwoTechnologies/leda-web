import { History } from '@types';
import Anchor from '@ui/anchor';
import { getTimeAgo } from '@utils/getTimeAgo';
import clsx from 'clsx';
import Image from 'next/image';
import useSWR from 'swr';
import { historyService } from '../../features/marketplace/services/history-service';

type Props = {
  space?: number;
  className?: string;
};
const fetchHistories = () => historyService.findAll().then((data) => data.reverse());

export const ActivityArea = ({ space = 1, className }: Props) => {
  const { data: history } = useSWR('fetchAllHistory', fetchHistories);
  // TODO: Enable filters if needed
  // const marketFilters = [
  //   ...new Set(flatDeep(data?.activities.map((activity) => activity.marketFilters))),
  // ];
  // const userFilters = [
  //   ...new Set(flatDeep(data?.activities.map((activity) => activity.userFilters))),
  // ];

  // const filterHandler = (filter) => {
  //   const newActivities = data?.activities.filter(
  //     (activity) => activity.marketFilters.includes(filter) || activity.userFilters.includes(filter)
  //   );
  //   setActivities(newActivities);
  // };

  if (!history?.length) {
    return (
      <div className="text-center my-5">
        <h3>No history found</h3>
      </div>
    );
  }

  if (!history) {
    return <>Loading</>;
  }
  return (
    <div className={clsx('rn-activity-area', space === 1 && 'rn-section-gapTop', className)}>
      <div className="container">
        <div className="row mb--30">
          <h3 className="title">All following Acivity</h3>
        </div>
        <div className="row g-6 activity-direction">
          <div className="col-lg-12 mb_dec--15">
            {history?.map((e: History) => (
              <div className={clsx('single-activity-wrapper', className)} key={e.id}>
                <div className="inner">
                  <div className="read-content">
                    <div className="thumbnail">
                      <Anchor path="path">
                        <Image
                          src={e.item?.image?.url}
                          alt="Nft_Profile"
                          width={500}
                          height={500}
                        />
                      </Anchor>
                    </div>
                    <div className="content">
                      <Anchor path="path">
                        <h6 className="title">{e.item.name}</h6>
                      </Anchor>
                      <span>
                        was {e.transactionType} {e.price && <>price for {e.price} ETH</>} by{' '}
                        <Anchor path="path">{e.owner.address}</Anchor>
                      </span>
                      <br />
                      <br />

                      {/* <p dangerouslySetInnerHTML={{ __html: desc }} /> */}
                      <div className="time-maintane">
                        <div className="time data">
                          <i className="feather-clock" />
                          <span>{getTimeAgo(e.createdAt)}</span>
                        </div>
                        {/* <div className="user-area data">
                          <i className="feather-user" />
                          <Anchor path="author.slug">{e.owner.address}</Anchor>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* TODO: Enable filters if needed */}
          {/* <div className="col-lg-4">
            <div className="filter-wrapper">
              <Sticky top="100px">
                <div className="widge-wrapper rbt-sticky-top-adjust">
                  <div className="inner">
                    <h3>Market filter</h3>
                    <div className="sing-filter">
                      {marketFilters?.map((item) => (
                        <button key={item} type="button" onClick={() => filterHandler(item)}>
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="inner">
                    <h3>Filter by users</h3>
                    <div className="sing-filter">
                      {userFilters?.map((item) => (
                        <button key={item} onClick={() => filterHandler(item)} type="button">
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Sticky>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
