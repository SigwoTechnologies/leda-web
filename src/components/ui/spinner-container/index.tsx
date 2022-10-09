import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
};
const SpinnerContainer: React.FC<Props> = ({ children, isLoading }) => (
  <div className="spinner-container">
    {children}
    {isLoading && (
      <div className="spinner-child">
        <ClipLoader className="spinner" color="#35b049" />
      </div>
    )}
  </div>
);

export default SpinnerContainer;
