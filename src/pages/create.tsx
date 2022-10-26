import Breadcrumb from '@components/breadcrumb';
import CreateNewArea from '@containers/create-new';
import withAuth from '@components/auth/withAuth';
import SEO from '@components/seo';

export async function getStaticProps() {
  return { props: { className: 'template-color-1' } };
}

const Create = () => (
  <>
    <SEO pageTitle="Create New" />
    <Breadcrumb pageTitle="Create new NFT" />
    <CreateNewArea />
  </>
);

export default withAuth(Create);
