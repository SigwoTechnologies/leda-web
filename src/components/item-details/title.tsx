import clsx from 'clsx';
import { useMemo } from 'react';
import { selectLikedItems } from '../../features/account/store/account.slice';
import { withAuthProtection } from '../../features/auth/store/auth.actions';
import { likeItem } from '../../features/marketplace/store/marketplace.actions';
import { selectIsOwner } from '../../features/marketplace/store/marketplace.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import ShareDropdown from '../share-dropdown';
import { HideItemButton } from './hide-item-button';

type Props = {
  className?: string;
};

const ProductTitle = ({ className }: Props) => {
  const dispatch = useAppDispatch();
  const {
    selectedItem: { name: title, likes: likeCount, itemId, collection, isHidden },
  } = useAppSelector((state) => state.marketplace);

  const isOwner = useAppSelector(selectIsOwner);

  const handleLikeItem = () => {
    dispatch(withAuthProtection(likeItem(itemId)));
  };
  const likedItems = useAppSelector(selectLikedItems);

  const isLiked = useMemo(
    () => Boolean(likedItems.find((likedItem) => likedItem.itemId === itemId)),
    [itemId, likedItems]
  );

  const likeClassName = isLiked ? 'liked-item' : 'no-liked-item';

  return (
    <div className={clsx('pd-title-area', className)}>
      <div>
        <span style={{ fontStyle: 'italic', color: 'orange', fontWeight: 500 }}>
          {isHidden && isOwner && 'This item is hidden'}
        </span>

        <h4 className="title">
          <span className="collections-link" style={{ fontStyle: 'italic' }}>
            {collection.name}
          </span>{' '}
          - {title}
        </h4>
      </div>
      <div className="pd-react-area">
        {isOwner && <HideItemButton />}

        <div className={`count ${likeClassName}`}>
          <button type="button" className={`${likeClassName} heart-count`} onClick={handleLikeItem}>
            <i className="feather-heart" />
            <span className="likeCountNumber">{likeCount}</span>
          </button>
        </div>

        <div className="count">
          <ShareDropdown />
        </div>
      </div>
    </div>
  );
};

export default ProductTitle;
