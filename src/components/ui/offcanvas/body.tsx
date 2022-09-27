import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const OffcanvasBody = ({ children, className }: Props) => (
  <div className={clsx(className, 'content')}>{children}</div>
);

export default OffcanvasBody;
