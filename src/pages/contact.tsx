import Breadcrumb from '@components/breadcrumb';
import ContactFormArea from '@containers/contact-form';
import ContactTopArea from '@containers/contact-top';
import GoogleMapArea from '@containers/google-map';
import SEO from '@components/seo';

const Contact = () => (
  <>
    <SEO pageTitle="Contact" />
    <Breadcrumb pageTitle="Contact With Us" currentPage="Contact With Us" />
    <ContactTopArea />
  </>
);

export default Contact;
