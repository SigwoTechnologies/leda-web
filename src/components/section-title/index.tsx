import clsx from 'clsx';

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
  disableAnimation?: boolean;
};

const SectionTitle = ({ title, className, disableAnimation, ...restProps }: Props) => (
  <h3
    className={clsx('title-s', className)}
    data-sal-delay="150"
    data-sal={!disableAnimation && 'slide-up'}
    data-sal-duration="800"
    {...restProps}
    dangerouslySetInnerHTML={{ __html: title }}
  />
);

export default SectionTitle;
