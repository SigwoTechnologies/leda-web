import clsx from 'clsx';
import TopSeller from '@components/top-seller/top-seller-1';
import { Author } from '../../types/author';

type Props = {
  className?: string;
  owner: Author;
};

const ProductCategory = ({ className, owner }: Props) => (
  <div className={clsx('catagory', className)}>
    <span>
      Category <span className="color-body">10% royalties</span>
    </span>
    <TopSeller
      name={owner.name}
      slug={owner.slug}
      image={{ src: owner.image.src, width: 44, height: 44 }}
    />
  </div>
);

export default ProductCategory;
