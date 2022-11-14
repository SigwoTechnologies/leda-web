import clsx from 'clsx';
import Product from '@components/item';
import { Product2 } from '@types';

type Props = {
  space?: number;
  className?: string;
  sectionTitle: string;
  relatedProducts: Product2[];
};

const ProductArea = ({ space = 1, className, sectionTitle, relatedProducts }: Props) => (
  <div className={clsx('product-area', space === 1 && 'rn-section-gapTop', className)}>
    <div className="container">
      <div className="row mb--30 align-items-center">
        <div className="col-12">
          <h3
            className="title mb--0"
            data-sal-delay="150"
            data-sal="slide-up"
            data-sal-duration="800"
          >
            {sectionTitle}
          </h3>
        </div>
      </div>
      <div className="row g-5">
        {relatedProducts?.map((prod: Product2) => (
          <div
            key={prod.id}
            data-sal="slide-up"
            data-sal-delay="150"
            data-sal-duration="800"
            className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <Product
              itemId={prod.id.toString()}
              title={prod.title}
              price={prod.price.amount}
              likeCount={prod.likeCount}
              auctionDate={prod.auctionDate}
              authors={prod.authors}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProductArea;
