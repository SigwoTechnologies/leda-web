import Head from 'next/head';
import { BodyWithMetadata } from './metadata-body';
import { BodyWithoutMetadata } from './nometadata-body';

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

    {pageMeta ? <BodyWithMetadata pageMeta={pageMeta} /> : <BodyWithoutMetadata />}
  </Head>
);

export default SEO;
