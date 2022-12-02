import Image from 'next/image';
import Anchor from '@ui/anchor';
import { FaEthereum, FaRegHeart } from 'react-icons/fa';
import { IoMdHeart } from 'react-icons/io';
import { formattedAddress } from '@utils/getFormattedAddress';
import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import useAppSelector from '../../store/hooks/useAppSelector';
import {
  resetSelectedCollectionStats,
  selectCollectionsState,
} from '../../features/collections/store/collections.slice';
import { Item } from '../../types/item';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import { findPagedCollectionsNfts } from '../../features/collections/store/collections.actions';
import { selectLikedItems } from '../../features/account/store/account.slice';

const LikeRender = ({ likes, itemId }: { likes: number; itemId: string }) => {
  const likedItems = useAppSelector(selectLikedItems);

  const isLiked = useMemo(
    () => Boolean(likedItems.find((likedItem) => likedItem.itemId === itemId)),
    [itemId, likedItems]
  );

  return (
    <span className="d-flex align-items-center" style={{ gap: '5px', fontWeight: 'bold' }}>
      {likes} {isLiked ? <IoMdHeart /> : <FaRegHeart />}
    </span>
  );
};

const ItemStatsComponent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { collectionId: slugId } = router.query;

  const { selectedCollection } = useAppSelector(selectCollectionsState);
  const { itemsStats } = selectedCollection;
  const { page } = selectedCollection.itemsStats;

  const hasMore =
    selectedCollection.itemsStats.items.length < selectedCollection.itemsStats.totalCount;

  const handleLoadNfts = useCallback(() => {
    if (hasMore) {
      dispatch(
        findPagedCollectionsNfts({
          collectionId: String(slugId),
          page: page + 1,
        })
      );
    }
  }, [dispatch, hasMore, slugId, page]);

  useEffect(() => {
    dispatch(resetSelectedCollectionStats());
  }, [dispatch, slugId]);

  useEffect(() => {
    if (itemsStats.items.length === 0) {
      dispatch(
        findPagedCollectionsNfts({
          collectionId: String(slugId),
          page: 1,
        })
      );
    }
  }, [dispatch, slugId, itemsStats.items.length]);

  useEffect(() => {
    const exitingFunction = () => dispatch(resetSelectedCollectionStats());
    router.events.on('routeChangeStart', exitingFunction);
    return () => {
      router.events.off('routeChangeStart', exitingFunction);
    };
  }, [dispatch, router.events]);

  return (
    <div className="rn-upcoming-area rn-section-gapTop" style={{ paddingTop: '20px' }}>
      <div className="container" style={{ padding: '0' }}>
        <div className="row">
          <div className="col-12">
            <div className="box-table table-responsive">
              <table className="table upcoming-projects">
                <thead>
                  <tr>
                    <th>
                      <span>#</span>
                    </th>
                    <th>
                      <span>NFT</span>
                    </th>
                    <th>
                      <span>Chain</span>
                    </th>
                    <th>
                      <span>Author</span>
                    </th>
                    <th>
                      <span>Owner</span>
                    </th>
                    <th>
                      <span>Likes</span>
                    </th>
                    <th>
                      <span>Price</span>
                    </th>
                  </tr>
                </thead>
                {itemsStats.items.map((item: Item, idx) => (
                  <tbody className="ranking" key={item.itemId}>
                    <tr className={`${idx % 2 === 0 ? 'color-light' : ''}`}>
                      <td>
                        <span>{idx + 1}</span>
                      </td>
                      <td>
                        <div className="product-wrapper d-flex align-items-center">
                          <Anchor path={`/item/${item.itemId}`}>
                            <div className="d-flex align-items-center">
                              <div className="thumbnail">
                                <Image
                                  src={item.image.url}
                                  alt="Nft_Profile"
                                  width={56}
                                  height={56}
                                  layout="fixed"
                                />
                              </div>
                              <span>{item.name}</span>
                            </div>
                          </Anchor>
                        </div>
                      </td>
                      <td>
                        <span
                          className="d-flex align-items-center"
                          style={{ gap: '3px', fontWeight: 'bold' }}
                        >
                          <FaEthereum />
                          ETH
                        </span>
                      </td>
                      <td>
                        <span>{formattedAddress(item.author.address)}</span>
                      </td>
                      <td>
                        <span>{formattedAddress(item.owner.address)}</span>
                      </td>
                      <td>
                        <LikeRender likes={item.likes} itemId={item.itemId} />
                      </td>
                      <td>
                        <span>{item.price ? `${item.price} ETH` : 'Not Listed'}</span>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
              {hasMore ? (
                <button type="button" className="load-more-btn" onClick={handleLoadNfts}>
                  Load more
                </button>
              ) : (
                <p className="no-load-more-btn">You&apos;ve seen all items on the collection</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemStatsComponent;
