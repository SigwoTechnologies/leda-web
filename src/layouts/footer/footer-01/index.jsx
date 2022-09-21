import FooterLinkWidget from '@widgets/footer-link-widget';
import SocialWidget from '@widgets/social-widget';

// Demo data
import contactData from '../../../data/general/contact.json';
import footerData from '../../../data/general/footer-01.json';

const Footer = () => (
  <div className="copy-right-one ptb--20 bg-color--1 mt-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="copyright-left">
            <span>{footerData.copyright_text}</span>
            <FooterLinkWidget data={footerData['footer-link-widget']} />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="copyright-right">
            <SocialWidget socials={contactData.socials} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
