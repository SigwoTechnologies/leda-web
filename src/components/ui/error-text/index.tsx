import PropTypes from 'prop-types';
import clsx from 'clsx';

// TODO: Type props
const ErrorText = ({ className, children }: any) => (
  <span className={clsx('text-danger mt-2 d-inline-block', className)}>{children}</span>
);

ErrorText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default ErrorText;
