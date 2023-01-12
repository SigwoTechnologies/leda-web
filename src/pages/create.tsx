import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import withAuth from '@components/auth/withAuth';
import { CreateNewItem } from '@containers/create-new/create-new-item';

const Create = () => (
  <>
    <SEO pageTitle="Create an NFT" />
    <Breadcrumb pageTitle="Create new NFT" />
    <CreateNewItem />
  </>
);

export default withAuth(Create);
