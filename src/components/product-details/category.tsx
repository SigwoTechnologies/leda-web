import PropTypes from 'prop-types';
import clsx from 'clsx';
import TopSeller from '@components/top-seller/top-seller-1';
import { ImageType } from '@utils/types';

// TODO: Type props
const ProductCategory = ({ className, owner }: any) => (
  <div className={clsx('catagory', className)}>
    <span>
      Catagory <span className="color-body">10% royalties</span>
    </span>
    <TopSeller
      name={owner.name}
      slug={owner.slug}
      image={{ src: owner.image.src, width: 44, height: 44 }}
    />
  </div>
);

ProductCategory.propTypes = {
  className: PropTypes.string,
  owner: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    image: ImageType,
  }),
};

export default ProductCategory;
