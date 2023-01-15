import Anchor from '@ui/anchor';
import Image from 'next/image';
import { ImageType } from '../../types/image';

type Props = {
  title: string;
  subtitle: string;
  path: string;
  description: string;
  image: ImageType;
};

const Service = ({ title, subtitle, path, description, image }: Props) => (
  <div
    data-sal="slide-up"
    data-sal-delay="150"
    data-sal-duration="800"
    className="rn-service-one color-shape-7"
  >
    <div className="inner">
      <div className="icon">
        {image?.src && (
          <Image
            src={image.src}
            alt={image?.alt || title}
            height={image.height || 100}
            width={image.width || 100}
          />
        )}
      </div>
      <div className="subtitle">{subtitle}</div>
      <div className="content">
        <h4 className="title">
          <Anchor path={path}>{title}</Anchor>
        </h4>
        <p className="description">{description}</p>
        <Anchor className="read-more-button" path={path}>
          <i className="feather-arrow-right" />
        </Anchor>
      </div>
    </div>
    <Anchor className="over-link" path={path}>
      <span className="visually-hidden">Click here to read more</span>
    </Anchor>
  </div>
);

export default Service;
