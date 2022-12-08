import clsx from 'clsx';
import Anchor from '@ui/anchor';

type Props = {
  className?: string;
  title: string;
  description: string;
  path: string;
  icon: string;
  color?: string;
};

const Wallet = ({ className, title, description, path, icon, color }: Props) => (
  <div className={clsx('wallet-wrapper', className)}>
    <div className="inner">
      <div className="icon">
        <i className={clsx('feather', icon, `color-${color}`)} />
      </div>
      <div className="content">
        <Anchor path={path}>
          <h4 className="title">{title}</h4>
        </Anchor>
        <p className="description">{description}</p>
      </div>
    </div>
    <Anchor className="over-link visually-hidden" path={path}>
      {title} link
    </Anchor>
  </div>
);

export default Wallet;
