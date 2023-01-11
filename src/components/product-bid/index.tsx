// TODO: Fix this Alefrank I'm tired
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Price } from '@types';
import useAppDispatch from '@store/hooks/useAppDispatch';
import { withAuthProtection } from '../../features/auth/store/auth.actions';
import ItemStatus from '../../common/minting/enums/item-status.enum';
import { likeItem } from '../../features/marketplace/store/marketplace.actions';

type Props = {
  itemId: string;
  price: Price;
  likeCount: number;
  status: number;
  isLiked: boolean;
};

const ProductBid = ({ itemId, price, likeCount, isLiked, status }: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(withAuthProtection(likeItem(itemId)));
  };

  const likeStyled = isLiked ? { color: '#35b049', fill: '#35b049' } : {};

  return (
    <div className="bid-react-area">
      {status === ItemStatus.Listed && (
        <div className="last-bid d-flex gap-2">
          {price.amount ? (
            <>
              <span>{price.amount}</span>
              <span>{price.currency}</span>
            </>
          ) : (
            <span>Free</span>
          )}
        </div>
      )}
      {status !== ItemStatus.Listed && (
        <div className="last-bid d-flex gap-2">
          <span>Not Listed Yet</span>
        </div>
      )}
      <div className="react-area" onClick={handleClick}>
        <svg
          viewBox="0 0 17 16"
          fill="none"
          width="16"
          height="16"
          className="sc-bdnxRM sc-hKFxyN kBvkOu"
          style={likeStyled}
        >
          <path
            d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <span className="number">{likeCount}</span>
      </div>
    </div>
  );
};

export default ProductBid;
