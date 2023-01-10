/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Anchor from '@ui/anchor';
import { formattedAddress } from '@utils/getFormattedAddress';
import { getFormattedName } from '@utils/getFormattedName';
import Image from 'next/image';
import { useCallback, useEffect, useMemo } from 'react';
import { FaEthereum, FaRegHeart } from 'react-icons/fa';
import { IoMdHeart } from 'react-icons/io';
import appConfig from '../../common/configuration/app.config';
import { withAuthProtection } from '../../features/auth/store/auth.actions';
import { findPagedCollectionsNfts } from '../../features/collections/store/collections.actions';
import { likeItem } from '../../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { Item } from '../../types/item';

const LikeRender = ({ likes, itemId }: { likes: number; itemId: string }) => {
  const dispatch = useAppDispatch();
  const { likedItems } = useAppSelector((state) => state.marketplace);

  const isLiked = useMemo(
    () => Boolean(likedItems.find((likedItem) => likedItem.itemId === itemId)),
    [itemId, likedItems]
  );

  const handleLike = () => {
    dispatch(withAuthProtection(likeItem(itemId)));
  };

  return (
    <p className="d-flex align-items-center" style={{ gap: '5px', fontWeight: 'bold' }}>
      <span className="items-likes-stats" onClick={handleLike}>
        {likes} {isLiked ? <IoMdHeart /> : <FaRegHeart />}
      </span>
    </p>
  );
};

const ItemStatsComponent = () => {
  const dispatch = useAppDispatch();
  const {
    selectedCollection,
    items,
    itemsCount,
    filters: { page },
  } = useAppSelector((state) => state.marketplace);

  const hasMore = items.length < itemsCount;

  const getMore = useCallback(
    (pg = 1) => {
      dispatch(
        findPagedCollectionsNfts({
          collectionId: selectedCollection.id,
          page: pg,
        })
      );
    },
    [dispatch, selectedCollection.id]
  );

  useEffect(() => {
    if (items.length === 0) {
      getMore();
    }
  }, [dispatch, selectedCollection.id, items.length, getMore]);

  const handleLoadNfts = useCallback(() => {
    if (hasMore) getMore(page + 1);
  }, [hasMore, getMore, page]);

  return (
    <div className="rn-upcoming-area rn-section-gapTop" style={{ paddingTop: '20px' }}>
      <div className="container" style={{ padding: '0' }}>
        <div className="row">
          <div className="col-12">
            <div className="box-table table-responsive">
              <table className="table upcoming-projects">
                <thead>
                  <tr>
                    {['#', 'NFT', 'Chain', 'Author', 'Owner', 'Likes', 'Price'].map((col) => (
                      <th key={col}>
                        <span>{col}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                {items.map((item: Item, idx) => (
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
                                  src={`${appConfig.imageUrl}${item.image?.url}`}
                                  alt="Nft_Profile"
                                  width={56}
                                  height={56}
                                  layout="fixed"
                                />
                              </div>
                              <span>{getFormattedName(item.name)}</span>
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
