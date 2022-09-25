import { memo } from 'react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClick: () => void;
};

const Offcanvas = memo(({ children, className, isOpen, onClick }: Props) => (
  <div
    className={clsx('popup-mobile-menu', isOpen ? 'active' : '', className)}
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    tabIndex={0}
  >
    <div
      className="inner"
      onClick={(e) => e.stopPropagation()}
      onKeyPress={onClick}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  </div>
));

Offcanvas.displayName = 'Offcanvas';

export default Offcanvas;
