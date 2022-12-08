import clsx from 'clsx';
import Product from '@components/item';
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
    <div className="container mt-4">
      <div className="row align-items-center mb-4">
        {!!items.length && data?.sectionTitle && (
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <SectionTitle {...data.sectionTitle} className="mb-0" />
          </div>
        )}

        {!!items.length && (
          <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
            <div
              className="view-more-btn text-start text-sm-end"
              data-sal-delay="150"
              data-sal="slide-up"
              data-sal-duration="800"
            >
              <Anchor
                className="btn-transparent d-flex align-items-center justify-content-end"
                path="/marketplace"
              >
                VIEW ALL
                <i className="feather feather-arrow-right" />
              </Anchor>
            </div>
          </div>
        )}
      </div>
      {items ? (
        <div className="row g-5" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
          {items.map((item: Item) => (
            <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <Product
                title={item.name}
                itemId={item.itemId}
                collectionId={item.collection.id}
                owner={item.owner}
                tokenId={item.tokenId}
                price={Number(item.price)}
                tags={item.tags}
                status={item.status}
                likeCount={item.likes}
                imageString={item.image?.url}
                isLazy={item.isLazy}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  </div>
);

export default NewestItem;
