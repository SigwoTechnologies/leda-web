import clsx from 'clsx';
import Product from '@components/product';
import SectionTitle from '@components/section-title';
import Anchor from '@ui/anchor';
import { Item, Section } from '@types';

type Props = {
  space?: number;
  className?: string;
  data?: Section;
  items: Item[];
};

const NewestItem = ({ space, className, data, items }: Props) => (
  <div className={clsx('rn-new-items', space === 1 && 'rn-section-gapTop', className)}>
    <div className="container">
      <div className="row mb--50 align-items-center">
        {data?.sectionTitle && (
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <SectionTitle {...data.sectionTitle} className="mb-0" />
          </div>
        )}

        <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
          <div
            className="view-more-btn text-start text-sm-end"
            data-sal-delay="150"
            data-sal="slide-up"
            data-sal-duration="800"
          >
            <Anchor className="btn-transparent" path="/product">
              VIEW ALL
              <i className="feather feather-arrow-right" />
            </Anchor>
          </div>
        </div>
      </div>
      {items && (
        <div className="row g-5">
          {items.map((item: Item) => (
            <div
              key={item.itemId}
              data-sal="slide-up"
              data-sal-delay="150"
              data-sal-duration="800"
              className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
            >
              <Product
                title={item.name}
                itemId={item.itemId}
                tokenId={item.tokenId}
                latestBid=""
                likeCount={item.likes}
                // image={prod.images?.[0]}
                imageString={item.image.url}
                // authors={prod.authors}
                // bitCount={prod.bitCount}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default NewestItem;
