import InfiniteScrollLibrary from 'react-infinite-scroll-component';
import LoadingSpinner from '@containers/marketplace/loading-spinner';
import Link from 'next/link';

type PropsType = {
  children: React.ReactNode;
  infiniteScrollSettings: {
    style?: {};
    dataLength: number;
    handleNext: () => void;
    hasMore: boolean;
    loading: boolean;
    endMessageDisplay: string;
    endMessageLink: string;
    endMessageLinkDetails: string;
  };
};

const InfiniteScroll = ({ children, infiniteScrollSettings }: PropsType) => (
  <InfiniteScrollLibrary
    style={infiniteScrollSettings.style}
    dataLength={infiniteScrollSettings.dataLength}
    next={infiniteScrollSettings.handleNext}
    hasMore={infiniteScrollSettings.hasMore}
    loader={infiniteScrollSettings.loading ? <LoadingSpinner /> : null}
    endMessage={
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px' }}>
        <b>
          {infiniteScrollSettings.endMessageDisplay}{' '}
          <Link href={infiniteScrollSettings.endMessageLink}>
            <span className="create-nft-button">
              {infiniteScrollSettings.endMessageLinkDetails}
            </span>
          </Link>
        </b>
      </p>
    }
  >
    {children}
  </InfiniteScrollLibrary>
);

export default InfiniteScroll;
