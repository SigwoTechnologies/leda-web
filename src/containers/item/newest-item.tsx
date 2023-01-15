import { ItemCard } from '@components/ItemCard';
import SectionTitle from '@components/section-title';
import useAppSelector from '@store/hooks/useAppSelector';
import Anchor from '@ui/anchor';
import { Item } from '../../types/item';
import { Section } from '../../types/section';

type Props = {
  data?: Section;
};

export const NewestItem = ({ data }: Props) => {
  const { newestItems } = useAppSelector((state) => state.marketplace);

  return (
    <div className="rn-new-items" data-sal-delay="15" data-sal="slide-up" data-sal-duration="800">
      <div className="container mt-4">
        <div className="row align-items-center mb-4">
          {!!newestItems.length && data?.sectionTitle && (
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <SectionTitle {...data.sectionTitle} className="mb-0" />
            </div>
          )}

          {!!newestItems.length && (
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
        {newestItems.length ? (
          <div className="row g-5">
            {newestItems.map((item: Item) => (
              <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                <ItemCard item={item} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
