import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import ServiceArea from '@containers/services';
import SupportArea from '@containers/support';

const Support = () => (
  <>
    <SEO pageTitle="Support" />
    <Breadcrumb pageTitle="Support Center" currentPage="Support Center" />
    <ServiceArea />
    <SupportArea />
  </>
);

export default Support;
