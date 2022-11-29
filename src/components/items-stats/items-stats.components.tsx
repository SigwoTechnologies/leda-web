import Image from 'next/image';
import Anchor from '@ui/anchor';
import { FaEthereum, FaRegHeart } from 'react-icons/fa';
import { formattedAddress } from '@utils/getFormattedAddress';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAppSelector from '../../store/hooks/useAppSelector';
import {
  resetSelectedCollectionStats,
  selectCollectionsState,
} from '../../features/collections/store/collections.slice';
import { Item } from '../../types/item';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import { findPagedCollectionsNfts } from '../../features/collections/store/collections.actions';

const ItemStatsComponent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { selectedCollection } = useAppSelector(selectCollectionsState);
  const { itemsStats } = selectedCollection;

  const hasMore =
    selectedCollection.itemsStats.items.length < selectedCollection.itemsStats.totalCount;

  const handleLoadNfts = useCallback(() => {
    if (hasMore) {
      const filtersUpdated = {
        ...selectedCollection.itemsFilters,
        page: selectedCollection.itemsFilters.page + 1,
      };
      dispatch(
        findPagedCollectionsNfts({
          collectionId: selectedCollection.collection.id,
          filters: filtersUpdated,
        })
      );
    }
  }, [dispatch, hasMore, selectedCollection.collection.id, selectedCollection.itemsFilters]);

  useEffect(() => {
    const exitingFunction = () => dispatch(resetSelectedCollectionStats());
    router.events.on('routeChangeStart', exitingFunction);
    return () => {
      router.events.off('routeChangeStart', exitingFunction);
    };
  }, []);

  useEffect(() => {
    dispatch(
      findPagedCollectionsNfts({
        collectionId: selectedCollection.collection.id,
        filters: selectedCollection.itemsFilters,
      })
    );
  }, [dispatch, selectedCollection.collection.id, selectedCollection.itemsFilters]);

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
                        <span
                          className="d-flex align-items-center"
                          style={{ gap: '5px', fontWeight: 'bold' }}
                        >
                          {item.likes} <FaRegHeart />
                        </span>
                      </td>
                      <td>
                        <span>{item.price ? `${item.price} ETH` : 'Not Listed'}</span>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
              {/* Review this logic */}
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
