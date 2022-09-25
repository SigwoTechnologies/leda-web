import clsx from 'clsx';

type Props = {
  className?: string;
  onClick: () => void;
};

const BurgerButton = ({ className, onClick }: Props) => (
  <button type="button" className={clsx(className, 'hamberger-button')} onClick={onClick}>
    <i className="feather-menu" />
  </button>
);

export default BurgerButton;
