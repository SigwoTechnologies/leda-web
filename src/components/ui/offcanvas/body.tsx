import clsx from 'clsx';
import PropTypes from 'prop-types';

// TODO: Type props
const OffcanvasBody = ({ children, className }: any) => (
  <div className={clsx(className, 'content')}>{children}</div>
);

OffcanvasBody.propTypes = {
  className: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default OffcanvasBody;
