import Breadcrumb from '@components/breadcrumb';
import PrivacyPolicyArea from '@containers/privacy-policy';
import SEO from '@components/seo';

const PrivacyPolicy = () => (
  <>
    <SEO pageTitle="Privacy Policy" />
    <Breadcrumb pageTitle="Follow Privacy Policy" currentPage="Follow Privacy Policy" />
    <PrivacyPolicyArea />
  </>
);

export default PrivacyPolicy;
