import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import CollectionDetailsArea from '@containers/collection-details/collection-details.container';

const CollectionDetailsPage = () => (
  <>
    <SEO pageTitle="Collection Details Page" />
    <Breadcrumb pageTitle="Collection Details Page" currentPage="Collection Details Page" />
    <CollectionDetailsArea />
  </>
);

export default CollectionDetailsPage;
