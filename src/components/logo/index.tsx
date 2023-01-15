import Image from 'next/image';
import Anchor from '@ui/anchor';
import clsx from 'clsx';
import { LogoType } from '../../types/logo';

type Props = {
  className?: string;
  logo: LogoType[];
};

const Logo = ({ className, logo }: Props) => (
  <div className={clsx('logo-thumbnail logo-custom-css', className)}>
    {logo?.[0]?.src && (
      <Anchor className="logo-light" path="/">
        <Image src={logo[0].src} alt={logo[0]?.alt || 'nft-logo'} width={214} height={62} />
      </Anchor>
    )}
    {logo?.[1]?.src && (
      <Anchor className="logo-dark" path="/">
        <Image src={logo[1].src} alt={logo[1]?.alt || 'nft-logo'} width={214} height={62} />
      </Anchor>
    )}
  </div>
);

export default Logo;
