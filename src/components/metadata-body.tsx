import appConfig from '../common/configuration/app.config';

type Metadata = {
  pageMeta: {
    nftName: string;
    nftAuthor: string;
    nftDescription: string;
    nftImage: string;
  };
};

export const BodyWithMetadata = ({ pageMeta }: Metadata) => (
  <>
    <meta name="title" content={`${pageMeta.nftName} NFT created by ${pageMeta.nftAuthor}`} />
    <meta
      name="description"
      content={`${pageMeta.nftDescription} - ${pageMeta.nftName} created by ${pageMeta.nftAuthor}. Check that amazing NFT now!`}
    />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={`${pageMeta.nftName} NFT on LEDA. NFT Marketplace`} />
    <meta
      property="og:description"
      content={`${pageMeta.nftDescription} - ${pageMeta.nftName} created by ${pageMeta.nftAuthor}. Check that amazing NFT now!`}
    />
    <meta property="og:image" content={`${appConfig.imageUrl}${pageMeta.nftImage}`} />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content={`${pageMeta.nftName} NFT on LEDA. NFT Marketplace`} />
    <meta
      property="twitter:description"
      content={`${pageMeta.nftDescription} - ${pageMeta.nftName} created by ${pageMeta.nftAuthor}. Check that amazing NFT now!`}
    />
    <meta property="twitter:image" content={`${appConfig.imageUrl}${pageMeta.nftImage}`} />
  </>
);
