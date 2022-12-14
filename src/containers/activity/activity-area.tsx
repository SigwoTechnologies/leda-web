import InfiniteScroll from '@components/common/InfiniteScroll';
import Anchor from '@ui/anchor';
import { getTimeAgo } from '@utils/getTimeAgo';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import appConfig from '../../common/configuration/app.config';
import { findAllHistory } from '../../features/marketplace/store/marketplace.actions';
import { resetFilters } from '../../features/marketplace/store/marketplace.slice';

export const ActivityArea = () => {
  const dispatch = useAppDispatch();
  const { history, isLoadingHistory, historyCount, filters } = useAppSelector(
    (state) => state.marketplace
  );

  const hasMore = history.length < historyCount;

  useEffect(() => {
    dispatch(resetFilters());
    dispatch(
      findAllHistory({
        limit: filters.limit,
        page: filters.page,
      })
    );
  }, [dispatch, filters.limit, filters.page]);

  const handleNext = useCallback(() => {
    if (hasMore) {
      const newPage = Math.floor(history.length / filters.limit + 1);
      dispatch(findAllHistory({ limit: filters.limit, page: newPage }));
    }
  }, [hasMore, history.length, filters.limit, dispatch]);

  const infiniteScrollSettings = {
    style: { overflow: 'inherit' },
    dataLength: history.length,
    handleNext,
    hasMore,
    loading: isLoadingHistory,
    endMessageDisplay: 'Looking for more Collections?',
    endMessageLink: '/create',
    endMessageLinkDetails: 'Create one!',
  };

  return (
    <InfiniteScroll infiniteScrollSettings={infiniteScrollSettings}>
      <div className="container mt-4" style={{ minHeight: '100vh' }}>
        <div className="row g-6 activity-direction">
          <div className="col-lg-12 mb_dec--15">
            {history?.map((e) => (
              <div className={clsx('single-activity-wrapper')} key={e.id}>
                <div className="inner">
                  <div className="read-content">
                    <div className="thumbnail">
                      <Anchor path={`/item/${e.item.itemId}`}>
                        <Image
                          src={`${appConfig.imageUrl}${e.item?.image?.url}`}
                          alt="Nft_Profile"
                          width={500}
                          height={500}
                        />
                      </Anchor>
                    </div>
                    <div
                      className="content"
                      style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}
                    >
                      <div className="top-seller-content">
                        <span>
                          <Anchor path={`/item/${e.item.itemId}`}>
                            <h6 className="activity-text">
                              {e.item.name} - #{e.item.itemId?.slice(0, 4)}
                            </h6>
                          </Anchor>
                          <div style={{ display: 'flex' }}>
                            was {e.transactionType} {e.price && <>for {e.price} ETH </>} by{' '}
                            {/* TODO: Link this with profile */}
                            <span className="activity-text">&nbsp;{e.owner?.address}</span>
                          </div>
                          <span>Token #{e.item.tokenId}</span>
                        </span>
                      </div>

                      <div className="time-maintane">
                        <div className="time data">
                          <i className="feather-clock" />
                          <span>{getTimeAgo(e.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InfiniteScroll>
  );
};
