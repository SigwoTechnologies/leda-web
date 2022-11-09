import { Item as ItemType } from '@types';
import ClipLoader from 'react-spinners/ClipLoader';
import InfiniteScroll from 'react-infinite-scroll-component';
import Item from '@components/item';
import { useCallback } from 'react';
import useAppSelector from '../../store/hooks/useAppSelector';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import { selectNFTsMarketplace } from '../../features/marketplace/store/marketplace.slice';
import { findPagedItems } from '../../features/marketplace/store/marketplace.actions';

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center">
    <ClipLoader className="spinner" color="#35b049" />
  </div>
);

const ProductArea = () => {
  const dispatch = useAppDispatch();
  const { marketplaceFilters, itemPagination, isLoading } = useAppSelector(selectNFTsMarketplace);
  const { items, totalCount } = itemPagination;

  const hasMore = items.length < totalCount;

  const handleNext = useCallback(() => {
    if (hasMore) {
      const newPage = Math.floor(items.length / marketplaceFilters.limit + 1);
      dispatch(findPagedItems({ ...marketplaceFilters, page: newPage }));
    }
  }, [dispatch, hasMore, marketplaceFilters, items]);

  return (
    <div className="rn-product-area rn-section-gapTop">
      <div className="row g-5">
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={totalCount}
          next={handleNext}
          hasMore={hasMore}
          loader={isLoading ? <LoadingSpinner /> : null}
          endMessage={
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="row g-5">
            {items.map((item: ItemType) => (
              <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                <Item
                  title={item.name}
                  itemId={item.itemId}
                  tokenId={item.tokenId}
                  price={Number(item.price)}
                  latestBid=""
                  likeCount={item.likes}
                  imageString={item.image.url}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProductArea;
