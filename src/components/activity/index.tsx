import Anchor from '@ui/anchor';
import clsx from 'clsx';
import Image from 'next/image';
import { Author } from '../../types/author';
import type { ImageType } from '../../types/image';

type Props = {
  className?: string;
  title: string;
  path: string;
  desc: string;
  time: string;
  date: string;
  author: Author;
  image: ImageType;
  status: string;
};

const Activity = ({ className, title, path, desc, time, date, author, image, status }: Props) => (
  <div className={clsx('single-activity-wrapper', className)}>
    <div className="inner">
      <div className="read-content">
        {image?.src && (
          <div className="thumbnail">
            <Anchor path={path}>
              <Image
                src={image.src}
                alt={image?.alt || 'Nft_Profile'}
                width={image?.width || 500}
                height={image?.height || 500}
                quality={10}
              />
            </Anchor>
          </div>
        )}
        <div className="content">
          <Anchor path={path}>
            <h6 className="title">{title}</h6>
          </Anchor>
          <p dangerouslySetInnerHTML={{ __html: desc }} />
          <div className="time-maintane">
            <div className="time data">
              <i className="feather-clock" />
              <span>
                {time} on {date}
              </span>
            </div>
            <div className="user-area data">
              <i className="feather-user" />
              <Anchor path={author.slug}>{author.name}</Anchor>
            </div>
          </div>
        </div>
      </div>
      <div className="icone-area">
        {status === 'follow' && <i className="feather-thumbs-up" />}
        {status === 'sale' && <i className="feather-shopping-cart" />}
        {status === 'like' && <i className="feather-heart" />}
        {status === 'offer' && <i className="feather-user-plus" />}
      </div>
    </div>
  </div>
);

export default Activity;
