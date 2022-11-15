import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = () => <ClipLoader className="spinner" color="#fff" size={18} />;

type PropsTypes = {
  loading: boolean;
  action: string;
  actionLoading: string;
};

const ActionLoaderComponent = ({ loading, action, actionLoading }: PropsTypes) => (
  <div className="d-flex align-items-center justify-content-center gap-2">
    {loading ? (
      <>
        <Spinner />
        <span>{actionLoading}...</span>
      </>
    ) : (
      <span>{action}</span>
    )}
  </div>
);

export default ActionLoaderComponent;
