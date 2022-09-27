import clsx from 'clsx';

type Props = {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
};

const OffcanvasHeader = ({ className, onClick, children }: Props) => (
  <div className={clsx('header-top', className)}>
    {children}
    <div className="close-menu">
      <button className="close-button" type="button" onClick={onClick}>
        <i className="feather-x" />
      </button>
    </div>
  </div>
);

export default OffcanvasHeader;
