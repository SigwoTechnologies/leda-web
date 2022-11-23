import clsx from 'clsx';
import SectionTitle from '@components/section-title';
import Service from '@components/service';
import { Section, SectionItem } from '@types';

type Props = {
  className?: string;
  id?: string;
  space?: number;
  data?: Section;
};

const ServiceArea = ({ className, id, space = 1, data }: Props) => (
  <div
    className={clsx(
      'rn-service-area',
      space === 1 && 'rn-section-gapTop',
      space === 2 && 'pb--70',
      className
    )}
    id={id}
  >
    <div className="container">
      {data?.sectionTitle && (
        <div className="row">
          <div className="col-12 mb--50">
            <SectionTitle {...data.sectionTitle} />
          </div>
        </div>
      )}
      {data?.items && (
        <div className="row g-5">
          {data.items.map((item: SectionItem) => (
            <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-6 col-12" key={item.id}>
              <Service
                title={item.title}
                subtitle={item.subtitle}
                path={item.path}
                description={item.description}
                image={item.images[0]}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default ServiceArea;
