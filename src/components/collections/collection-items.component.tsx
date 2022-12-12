import InfiniteScroll from '@components/common/InfiniteScroll';
import Item from '@components/item';
import { useCallback } from 'react';
import { findPagedCollectionItems } from '../../features/collections/store/collections.actions';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { Item as ItemType } from '../../types/item';

const CollectionProductsComponent = () => {
  const dispatch = useAppDispatch();
  const {
    selectedCollection,
    collectionItemsFiltering: {
      itemsPagination: { items, totalCount },
      itemsFilters,
    },
  } = useAppSelector((state) => state.collections);

  const hasMore = items.length < totalCount;

  const handleNext = useCallback(() => {
    if (hasMore) {
      const newPage = Math.floor(items.length / itemsFilters.limit + 1);
      const filters = { ...itemsFilters, page: newPage };
      dispatch(findPagedCollectionItems({ collectionId: selectedCollection.id, filters }));
    }
  }, [dispatch, hasMore, itemsFilters, items, selectedCollection.id]);

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
          {items.map((item: ItemType) => (
            <div key={item.itemId} className="col-6 col-lg-3 col-md-7 col-sm-6 col-12">
              <Item
                title={item.name}
                itemId={item.itemId}
                tokenId={item.tokenId}
                owner={item.owner}
                tags={item.tags}
                collectionId={item.collection.id}
                price={Number(item.price)}
                status={item.status}
                likeCount={item.likes}
                imageString={item.image?.url}
                isLazy={item.isLazy}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default CollectionProductsComponent;
