import { useState } from 'react';
import clsx from 'clsx';
import Activity from '@components/activity';
import { Activity as ActivityType } from '@types';

type Props = {
  space?: number;
  className?: string;
  data: { activities: ActivityType[] };
};

const ActivityArea = ({ space = 1, className, data }: Props) => {
  const [activities, setActivities] = useState(data?.activities || []);
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

  return (
    <div className={clsx('rn-activity-area', space === 1 && 'rn-section-gapTop', className)}>
      <div className="container">
        <div className="row mb--30">
          <h3 className="title">All following Acivity</h3>
        </div>
        <div className="row g-6 activity-direction">
          <div className="col-lg-12 mb_dec--15">
            {activities?.map((item: ActivityType) => (
              <Activity
                key={item.id}
                image={item.image}
                title={item.title}
                path={item.slug}
                desc={item.description}
                time={item.time}
                date={item.date}
                author={item.author}
                status={item.status}
              />
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

export default ActivityArea;
