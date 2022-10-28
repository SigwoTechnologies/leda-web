import clsx from 'clsx';
import ShareDropdown from '../share-dropdown';

type Props = {
  className?: string;
  title: string;
  likeCount?: number;
  itemId?: number;
  tokenId?: number;
};

const ProductTitle = ({ className, title, tokenId, likeCount = 0, itemId }: Props) => (
  <div className={clsx('pd-title-area', className)}>
    <h4 className="title">
      {title}#{tokenId}
    </h4>
    <div className="pd-react-area">
      <div className="heart-count">
        <i className="feather-heart" />
        <span>{likeCount}</span>
      </div>
      <div className="count">
        <ShareDropdown />
      </div>
    </div>
  </div>
);

export default ProductTitle;
