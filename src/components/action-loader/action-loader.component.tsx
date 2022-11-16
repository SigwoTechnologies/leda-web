import Button from '@ui/button';
import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = () => <ClipLoader className="spinner" color="#fff" size={18} />;

type PropsTypes = {
  isLoading: boolean;
  label: string;
  labelLoading: string;
  onClick: () => void;
  buttonSize?: 'small' | 'medium' | 'large';
  buttonFullwidth?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const ActionLoaderComponent = ({
  isLoading,
  label = 'Load',
  labelLoading = 'Loading',
  children,
  onClick,
  buttonSize = 'medium',
  buttonFullwidth = true,
  className = '',
}: PropsTypes) => (
  <Button
    size={buttonSize}
    fullwidth={buttonFullwidth}
    onClick={onClick}
    className={isLoading ? `disabled ${className}` : `${className}`}
  >
    <div className="d-flex align-items-center justify-content-center gap-2">
      {isLoading ? (
        <>
          <Spinner />
          <span>{labelLoading}...</span>
        </>
      ) : (
        <span>{children || label}</span>
      )}
    </div>
  </Button>
);

export default ActionLoaderComponent;
