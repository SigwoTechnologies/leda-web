import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Item from '@components/item';
import { Item as ItemType } from '@types';
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';

type Props = {
  className?: string;
  space?: number | 1 | 2;
  nfts: ItemType[];
};

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center">
    <ClipLoader className="spinner" color="#35b049" />
  </div>
);

const ProductArea = ({ className, space, nfts }: Props) => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(3);

  const loadMoreItems = async () => {
    const { data } = await axios.get(`http://localhost:3334/v1/items?limit=5&page=${page}`);
    setPage((prev) => prev + 1);
    if (nfts.length === data.databaseLength) {
      setHasMore(false);
    }
    console.log(data);
  };

  // pages --> totalObt / limit
  // totalItmes === totalobt --> !hasMore

  return (
    <div className={clsx('rn-product-area', space === 1 && 'rn-section-gapTop', className)}>
      <div className="">
        <div className="row g-5">
          {nfts.length ? (
            <InfiniteScroll
              style={{ overflow: 'hidden' }}
              dataLength={nfts.length}
              next={loadMoreItems}
              hasMore={hasMore}
              loader={<LoadingSpinner />}
              endMessage={
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <div className="row g-5">
                {nfts.map((item: ItemType) => (
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
          ) : (
            <div className="text-center">
              <h3>No Item to show</h3>
              <h4 style={{ color: '#35b049' }}>
                <u>Please try searching with other values</u>
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductArea;
