import FooterLinkWidget from '@widgets/footer-link-widget';
import { BsTwitter } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';

// Demo data
import footerData from '../../data/general/footer-01.json';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="copy-right-one ptb--20 bg-color--1 mt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="copyright-left">
              <span>
                © {year} {footerData.copyright_text} <small>{footerData.application_version}</small>
              </span>
              <FooterLinkWidget menu={footerData['footer-link-widget'].menu} />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="copyright-right">
              {/* Uncomment this when we find the way to make the icons dynamic */}
              {/* {socialMedia[0].socials.map((data: SocialItem) => (
                <SocialWidget
                  key={data.id}
                  title={data.title}
                  icon={data.icon}
                  id={data.id}
                  link={data.link}
                />
              ))} */}
              <ul className="social-copyright">
                <li>
                  <a
                    href="https://twitter.com/jup_project"
                    target="_blank"
                    className="mx-2"
                    rel="noreferrer"
                    aria-label="Twitter"
                  >
                    <BsTwitter />
                  </a>
                </li>
              </ul>
              <ul className="social-copyright">
                <li>
                  <a
                    href="https://discord.gg/jUgED8K"
                    target="_blank"
                    className="mx-2"
                    rel="noreferrer"
                    aria-label="Discord"
                  >
                    <FaDiscord />
                  </a>
                </li>
              </ul>
              <ul className="social-copyright">
                <li>
                  <a
                    href="mailto:info@jup.io"
                    target="_blank"
                    className="mx-2"
                    rel="noreferrer"
                    aria-label="LEDA Mail"
                  >
                    <MdMail />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
