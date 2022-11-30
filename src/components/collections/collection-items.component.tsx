import InfiniteScroll from '@components/common/InfiniteScroll';
import Item from '@components/item';
import { useCallback } from 'react';
import { findPagedCollectionItems } from '../../features/collections/store/collections.actions';
import { selectCollectionsState } from '../../features/collections/store/collections.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { Item as ItemType } from '../../types/item';

const CollectionProductsComponent = () => {
  const dispatch = useAppDispatch();
  const { selectedCollection } = useAppSelector(selectCollectionsState);

  const { itemsFilters } = selectedCollection.collectionItemsFiltering;
  const { items, totalCount } = selectedCollection.collectionItemsFiltering.itemsPagination;

  const hasMore = items.length < totalCount;

  const handleNext = useCallback(() => {
    if (hasMore) {
      const newPage = Math.floor(items.length / itemsFilters.limit + 1);
      const filters = { ...itemsFilters, page: newPage };
      dispatch(
        findPagedCollectionItems({ collectionId: selectedCollection.collection.id, filters })
      );
    }
  }, [dispatch, hasMore, itemsFilters, items, selectedCollection.collection.id]);

  const infiniteScrollSettings = {
    style: { overflow: 'inherit' },
    dataLength: items.length,
    handleNext,
    hasMore,
    loading: false,
    endMessageDisplay: 'Looking for more NFTs?',
    endMessageLink: '/create',
    endMessageLinkDetails: 'Create one!',
  };

  return (
    <div className="row g-5">
      <InfiniteScroll infiniteScrollSettings={infiniteScrollSettings}>
        <div className="row g-5">
          {selectedCollection.collection.items.map((item: ItemType) => (
            <div key={item.itemId} className="col-6 col-lg-3 col-md-7 col-sm-6 col-12">
              <Item
                title={item.name}
                itemId={item.itemId}
                tokenId={item.tokenId}
                owner={item.owner}
                tags={item.tags}
                price={Number(item.price)}
                status={item.status}
                likeCount={item.likes}
                imageString={item.image.url}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default CollectionProductsComponent;
