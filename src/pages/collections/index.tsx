import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import CollectionsArea from '@containers/collections/collections.container';

const CollectionsPage = () => (
  <>
    <SEO pageTitle="Collections" />
    <Breadcrumb pageTitle="Collections" currentPage="Collections" />
    <CollectionsArea />
  </>
);

export default CollectionsPage;
