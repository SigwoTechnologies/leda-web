import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import TermsAndConditionsArea from '@containers/terms-condition';

const TermsAndConditions = () => (
  <>
    <SEO pageTitle="Terms & Condition" />
    <Breadcrumb pageTitle="Terms & Condition" currentPage="Terms & Condition" />
    <TermsAndConditionsArea />
  </>
);

export default TermsAndConditions;
