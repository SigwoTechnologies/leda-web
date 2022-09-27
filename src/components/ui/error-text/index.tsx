import clsx from 'clsx';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const ErrorText = ({ className, children }: Props) => (
  <span className={clsx('text-danger mt-2 d-inline-block', className)}>{children}</span>
);

export default ErrorText;
