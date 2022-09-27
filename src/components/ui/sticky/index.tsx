import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
  top?: string;
};

const Sticky = ({ children, className, top = '100px' }: Props) => (
  <div className={clsx('widge-wrapper', className)} style={{ top }}>
    {children}
  </div>
);

export default Sticky;
