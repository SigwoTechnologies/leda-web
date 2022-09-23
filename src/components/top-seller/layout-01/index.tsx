import Image from 'next/image';
import clsx from 'clsx';
import Anchor from '@ui/anchor';
import Button from '@ui/button';

// TODO: Type props
const TopSeller = ({ name, totalSale, image, slug, className, isVarified, followBtn }: any) => (
  <div className={clsx('top-seller-inner-one', className)}>
    <div className="top-seller-wrapper">
      <div className={clsx('thumbnail', isVarified && 'varified')}>
        {image?.src && (
          <Anchor path={slug}>
            <Image
              src={image.src}
              alt={image?.alt || name}
              width={image?.width || 54}
              height={image?.height || 54}
              layout="fixed"
            />
          </Anchor>
        )}
      </div>
      <div className="top-seller-content">
        <Anchor path={slug}>
          <h6 className="name">{name}</h6>
        </Anchor>
        {totalSale && (
          <span className="count-number">
            {new Intl.NumberFormat('en-US', {
              currency: 'USD',
            }).format(totalSale)}
          </span>
        )}
      </div>
    </div>
    {followBtn && (
      <Button path={slug} color="primary-alta" size="small">
        Follow
      </Button>
    )}
  </div>
);

export default TopSeller;
