import Breadcrumb from '@components/breadcrumb';
import ContactTopArea from '@containers/contact-top';
import SEO from '@components/seo';

const Contact = () => (
  <>
    <SEO pageTitle="Contact" />
    <Breadcrumb pageTitle="Contact With Us" currentPage="Contact With Us" />
    <ContactTopArea />
  </>
);

export default Contact;
