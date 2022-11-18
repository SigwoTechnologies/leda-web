import Button from '@ui/button';
import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = () => <ClipLoader className="spinner" color="#fff" size={18} />;

type PropsType = {
  isLoading: boolean;
  label: string;
  labelLoading: string;
  onClick: () => void;
  buttonSize?: 'small' | 'medium' | 'large';
  buttonFullwidth?: boolean;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

const ActionLoaderComponent = ({
  isLoading,
  label = 'Load',
  labelLoading = 'Loading',
  children,
  type = 'button',
  disabled,
  onClick,
  buttonSize = 'medium',
  buttonFullwidth = true,
  className = '',
}: PropsType) => (
  <Button
    size={buttonSize}
    type={type}
    fullwidth={buttonFullwidth}
    onClick={onClick}
    disabled={disabled}
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
