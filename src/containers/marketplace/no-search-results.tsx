import Link from 'next/link';

const NoSearchResults = () => (
  <div className="text-center my-5">
    <h2>No results found</h2>
    <h6>Try adjusting your search to find what you&apos;re looking for</h6>
    <h6 className="font-light" style={{ fontWeight: '400' }}>
      Do you want to become an NFT artist?
    </h6>
    <Link href="/create">
      <h5 className="text-center text-underline notNftsLink create-nft-button">
        Visit our creation center!
      </h5>
    </Link>
  </div>
);

export default NoSearchResults;
