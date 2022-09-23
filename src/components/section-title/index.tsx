import PropTypes from 'prop-types';
import clsx from 'clsx';

// TODO: Type props
const SectionTitle = ({ title, className, disableAnimation, ...restProps }: any) => (
  <h3
    className={clsx('title', className)}
    data-sal-delay="150"
    data-sal={!disableAnimation && 'slide-up'}
    data-sal-duration="800"
    {...restProps}
    dangerouslySetInnerHTML={{ __html: title }}
  />
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  disableAnimation: PropTypes.bool,
};

export default SectionTitle;
