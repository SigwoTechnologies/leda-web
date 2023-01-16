import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
  style?: any;
};
export const SpinnerContainer: React.FC<Props> = ({ children, isLoading, style }) => (
  <div className="spinner-container" style={style}>
    {children}
    {isLoading && (
      <div className="spinner-child">
        <ClipLoader className="spinner" color="#35b049" />
      </div>
    )}
  </div>
);
