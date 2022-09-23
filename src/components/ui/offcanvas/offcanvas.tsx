import { memo } from 'react';
import clsx from 'clsx';

// TODO: Type props
const Offcanvas = memo(({ children, className, isOpen, onClick }: any) => (
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
