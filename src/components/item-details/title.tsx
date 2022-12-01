import Anchor from '@ui/anchor';
import clsx from 'clsx';
import { useMemo } from 'react';
import Link from 'next/link';
import ItemStatus from '../../common/minting/enums/item-status.enum';
import { selectLikedItems } from '../../features/account/store/account.slice';
import { withAuthProtection } from '../../features/auth/store/auth.actions';
import { hideItem, likeItem } from '../../features/marketplace/store/marketplace.actions';
import { selectIsOwner } from '../../features/marketplace/store/marketplace.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import ShareDropdown from '../share-dropdown';

type Props = {
  className?: string;
};

const ProductTitle = ({ className }: Props) => {
  const dispatch = useAppDispatch();
  const {
    selectedItem: { name: title, likes: likeCount, itemId, status },
  } = useAppSelector((state) => state.marketplace);

  const isOwner = useAppSelector(selectIsOwner);

  const handleHideItem = () => {
    dispatch(withAuthProtection(hideItem(itemId)));
  };

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
          {status === ItemStatus.Hidden && 'This item is hidden'}
        </span>

        <h4 className="title">
          {title} #{itemId.slice(0, 4)}
        </h4>
      </div>
      <div className="pd-react-area">
        {isOwner && (
          <div className="count">
            <button
              type="button"
              style={{ width: '5rem', fontSize: '20px' }}
              onClick={handleHideItem}
              title={`currently is ${status === ItemStatus.Hidden ? 'hidden' : 'visible'}`}
            >
              <i
                className={clsx(status === ItemStatus.Hidden ? 'feather-eye-off' : 'feather-eye')}
              />
            </button>
          </div>
        )}

        <div className="count">
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
