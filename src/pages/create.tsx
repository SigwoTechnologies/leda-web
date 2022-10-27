import Breadcrumb from '@components/breadcrumb';
import CreateNewArea from '@containers/create-new';
import SEO from '@components/seo';
import withAuth from '@components/auth/withAuth';

const Create = () => (
  <>
    <SEO pageTitle="Create New" />
    <Breadcrumb pageTitle="Create new NFT" />
    <CreateNewArea />
  </>
);

export default withAuth(Create);
