import clsx from 'clsx';
import TopSeller from '@components/top-seller/top-seller-1';
import { Collection } from '../../types/collection';

type Props = {
  className?: string;
  collection: Collection;
};

const ProductCollection = ({ className, collection }: Props) => (
  <div className={clsx('collection', className)}>
    <span>Collections</span>
    <TopSeller
      name={collection.name}
      slug={collection.slug}
      image={{ src: collection.image.src, width: 44, height: 44 }}
    />
  </div>
);

export default ProductCollection;
