import PropTypes from 'prop-types';
import clsx from 'clsx';

// TODO: Type props
const BurgerButton = ({ className, onClick }: any) => (
  <button type="button" className={clsx(className, 'hamberger-button')} onClick={onClick}>
    <i className="feather-menu" />
  </button>
);

BurgerButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default BurgerButton;
