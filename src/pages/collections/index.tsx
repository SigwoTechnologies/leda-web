import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import CollectionsArea from '@containers/collections/collections.container';

const CollectionsPage = () => (
  <>
    <SEO pageTitle="NFTs Collections" />
    <Breadcrumb pageTitle="NFTs Collections" currentPage="NFTs Collections" />
    <CollectionsArea />
  </>
);

export default CollectionsPage;
