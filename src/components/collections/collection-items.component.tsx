import Item from '@components/item';
import { selectCurrentSelection } from '../../features/collections/store/collections.slice';
import useAppSelector from '../../store/hooks/useAppSelector';
import { Item as ItemType } from '../../types/item';

const CollectionProductsComponent = () => {
  const collection = useAppSelector(selectCurrentSelection);

  return (
    <div className="row g-5">
      {collection.items.map((item: ItemType) => (
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
  );
};

export default CollectionProductsComponent;
