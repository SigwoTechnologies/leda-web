import ClipLoader from 'react-spinners/ClipLoader';

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center mt-4">
    <ClipLoader className="spinner" color="#35b049" />
  </div>
);

export default LoadingSpinner;
