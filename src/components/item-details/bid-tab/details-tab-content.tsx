import TopSeller from '@components/top-seller/top-seller-1';
import { Author, Property, Tag } from '@types';

type Props = {
  owner: Author;
  properties: Property[];
  tags: Tag[];
};

const DetailsTabContent = ({ owner, properties, tags }: Props) => (
  <div className="rn-pd-bd-wrapper mt--20">
    <TopSeller
      name={owner.name}
      totalSale={owner.totalSale}
      slug={owner.slug}
      image={owner.image}
    />
    {properties && (
      <div className="rn-pd-sm-property-wrapper">
        <h6 className="pd-property-title">Property</h6>
        <div className="property-wrapper">
          {properties.map((property: Property) => (
            <div key={property.id} className="pd-property-inner">
              <span className="color-body type">{property.type}</span>
              <span className="color-white value">{property.value}</span>
            </div>
          ))}
        </div>
      </div>
    )}
    {tags && (
      <div className="rn-pd-sm-property-wrapper">
        <h6 className="pd-property-title">Tags</h6>
        <div className="catagory-wrapper">
          {tags.map((tag: Tag, idx: number) => (
            <div key={tag.id} className="pd-property-inner">
              <span className="color-body type">#{idx + 1} TAG </span>
              <span className="color-white value">{tag.name.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default DetailsTabContent;
