import Head from 'next/head';

type Props = {
  pageTitle: string;
  pageMeta?: {
    nftName: string;
    nftAuthor: string;
    nftDescription: string;
    nftImage: string;
  };
};

const SEO = ({ pageTitle, pageMeta }: Props) => (
  <Head>
    <title> {pageTitle} | LEDA - Jupiter Based NFT Marketplace</title>
    <link rel="icon" href="/favicon.ico" />
    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    <meta name="robots" content="noindex, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    {pageMeta ? (
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
        <meta property="og:image" content={pageMeta.nftImage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content={`${pageMeta.nftName} NFT on LEDA. NFT Marketplace`}
        />
        <meta
          property="twitter:description"
          content={`${pageMeta.nftDescription} - ${pageMeta.nftName} created by ${pageMeta.nftAuthor}. Check that amazing NFT now!`}
        />
        <meta property="twitter:image" content={pageMeta.nftImage} />
      </>
    ) : (
      <>
        <meta name="title" content="LEDA - NFT Marketplace" />
        <meta name="description" content="LEDA is the largest NFT Marketplace in the earth" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="LEDA - NFT Marketplace" />
        <meta
          property="og:description"
          content="LEDA is the largest NFT Marketplace in the earth"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="LEDA - NFT Marketplace" />
        <meta
          property="twitter:description"
          content="LEDA is the largest NFT Marketplace in the earth"
        />
      </>
    )}
  </Head>
);

export default SEO;
