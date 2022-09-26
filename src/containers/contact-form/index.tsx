import clsx from 'clsx';
import Image from 'next/image';
import ContactForm from '@components/contact-form';

type Props = {
  space?: number;
  className?: string;
};

const ContactFormArea = ({ space = 1, className }: Props) => (
  <div className={clsx('login-area message-area', space === 1 && 'rn-section-gapTop', className)}>
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6" data-sal="slide-up" data-sal-delay="150" data-sal-duration="800">
          <div className="connect-thumbnail">
            <div className="left-image">
              <Image
                src="/images/contact/contact1.png"
                alt="Nft_Profile"
                width={669}
                height={686}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6" data-sal="slide-up" data-sal-delay="200" data-sal-duration="800">
          <ContactForm />
        </div>
      </div>
    </div>
  </div>
);

export default ContactFormArea;
