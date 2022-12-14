import clsx from 'clsx';
import AddressBox from '@components/address-box';

type Props = {
  space?: number;
  className?: string;
};
const ContactTopArea = ({ space = 1, className }: Props) => (
  <div
    className={clsx(
      'rn-contact-top-area bg_color--5',
      space === 1 && 'rn-section-gapTop',
      className
    )}
    style={{ height: '100vh' }}
  >
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-12" data-sal="slide-up" data-sal-delay="150" data-sal-duration="800">
          <div className="section-title mb--30 text-center">
            <h2 className="title">Quick Contact Address</h2>
            <p className="description">
              There are many variations of passages of Lorem Ipsum available, <br /> but the
              majority have suffered alteration.
            </p>
          </div>
        </div>
      </div>
      <div className="row g-5">
        <div
          className="col-lg-4 col-md-6 col-sm-6 col-12"
          data-sal="slide-up"
          data-sal-delay="150"
          data-sal-duration="800"
        >
          <AddressBox
            icon="feather-phone"
            title="Contact Phone Number"
            phoneNumbers={['+444 555 666 777', '+222 222 222 333']}
          />
        </div>
        <div
          className="col-lg-4 col-md-6 col-sm-6 col-12"
          data-sal="slide-up"
          data-sal-delay="200"
          data-sal-duration="800"
        >
          <AddressBox
            icon="feather-mail"
            title="Our Email Address"
            emails={['admin@gmail.com', 'example@gmail.com']}
          />
        </div>
        <div
          className="col-lg-4 col-md-6 col-sm-6 col-12"
          data-sal="slide-up"
          data-sal-delay="250"
          data-sal-duration="800"
        >
          <AddressBox
            icon="feather-map-pin"
            title="Our Location"
            address="5678 Bangla Main Road, cities 580 <br> GBnagla, example 54786"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ContactTopArea;
