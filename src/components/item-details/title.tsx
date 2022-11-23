import Anchor from '@ui/anchor';
import clsx from 'clsx';
import { useMemo } from 'react';
import Link from 'next/link';
import { selectLikedItems } from '../../features/account/store/account.slice';
import { withAuthProtection } from '../../features/auth/store/auth.actions';
import { likeItem } from '../../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import ShareDropdown from '../share-dropdown';

type Props = {
  className?: string;
  title: string;
  likeCount?: number;
  itemId: string;
};

const ProductTitle = ({ className, title, likeCount = 0, itemId }: Props) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(withAuthProtection(likeItem(itemId)));
  };
  const likedItems = useAppSelector(selectLikedItems);

  const isLiked = useMemo(
    () => Boolean(likedItems.find((likedItem) => likedItem.itemId === itemId)),
    [itemId, likedItems]
  );

  const likeClassname = isLiked ? 'liked-item' : 'no-liked-item';

  return (
    <div className={clsx('pd-title-area', className)}>
      <h4 className="title">
        {title} #{itemId.slice(0, 4)}
      </h4>
      <div className="pd-react-area">
        <button type="button" className={`${likeClassname} heart-count`} onClick={handleClick}>
          <i className="feather-heart" />
          <span className="likeCountNumber">{likeCount}</span>
        </button>
        <div className="count">
          <ShareDropdown />
        </div>
      </div>
    </div>
  );
};

export default ProductTitle;
